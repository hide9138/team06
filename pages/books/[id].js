import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../styles/books/Home.module.css'
import { useAuth } from '../../components/AuthContext'
import OutputCard from '../../components/outputCard'
import Layout from '../../components/layout'
import { getBook } from '../../components/BookApiFetch'
import firebase, { db } from '../../firebase/firebase'

const Outputs = ({ outputs }) => {
	return (
		<>
			<div className={styles.contents__container}>
				{outputs.map((output, i) => (
					<OutputCard key={i} output={output} />
				))}
			</div>
		</>
	)
}

const Home = () => {
	const router = useRouter()
	const { id } = router.query
	const bookRef = db.collection('books').where('id', '==', id)
	const [outputs, setOutputs] = useState([])
	const [bookDetail, setBookDetail] = useState([])
	const updateState = book => setBookDetail(book) // console.log(outputs)
	const { currentUser } = useAuth()

	useEffect(() => {
		const getOutputs = async () => {
			const bookRefs = await bookRef.limit(10).get()
			const bookList = bookRefs.docs.map(querySnapshot => {
				return { mainId: querySnapshot.id, ref: querySnapshot.ref, ...querySnapshot.data() }
			})
			const bookRefList = bookList.map(book => book.ref)

			const tweetRefs = await db.collection('tweets').orderBy('updateTime', 'desc').get()
			const tweetDocs = tweetRefs.docs.filter(tweet => bookRefList.some(bookRef => tweet.data().bookRef.isEqual(bookRef)))
			const tweetList = tweetDocs.map(querySnapshot => {
				return { ref: querySnapshot.ref, ...querySnapshot.data() }
			})

			const userRefs = await db.collection('users').get()
			const userList = userRefs.docs.map(querySnapshot => {
				return { mainId: querySnapshot.id, ...querySnapshot.data() }
			})

			const outputs = tweetList.map(tweet => {
				const user = userList.filter(user => user.mainId == tweet.userRef.id)[0]
				const book = bookList.filter(book => book.mainId == tweet.bookRef.id)[0]
				return { user, tweet, book }
			})

			setOutputs(outputs)
		}
		getBook(id, updateState)
		getOutputs()
		console.log('effect')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	if (!currentUser) {
		return <></>
	}

	const hondleCreateBook = async () => {
		const userRef = db.collection('users').doc(currentUser.uid)
		const bookRefs = await db.collection('books').where('userRef', '==', userRef).where('id', '==', bookDetail.id).get()
		if (bookRefs.docs.length === 0) {
			db.collection('books').add({
				...bookDetail,
				userRef: userRef,
				createTime: firebase.firestore.FieldValue.serverTimestamp(),
			})
			router.push('./new1/')
		} else {
			window.alert('すでに本棚に同じ本が存在しています')
		}
	}

	return (
		<main className={styles.main}>
			<div className={styles.title__container}>
				<h1 className={styles.title}>本の詳細</h1>
			</div>

			<div className={styles.book__info__container}>
				{bookDetail.id && (
					<>
						<div className={styles.book__info__block}>
							<div className={styles.book__info__book__image__area}>
								<Image src={bookDetail.imageLink} width="220" height="300" alt="book image" className={styles.book__info__book__image} />
							</div>
							<div className={styles.book__info__basic__info}>
								<p className={styles.book__info__title}>{bookDetail.title}</p>
								<p className={styles.book__info__author}>
									著者名：
									{bookDetail.authors && <>{bookDetail.authors.join(', ')}</>}
								</p>

								<p className={styles.book__info__publisher}>
									{bookDetail.publishedDate}　出版社: {bookDetail.publisher}
								</p>
							</div>
						</div>
						<div>{bookDetail.description && <p className={styles.book__info__description}>{bookDetail.description}</p>}</div>
					</>
				)}
				<div className={styles.btn__group}>
					<button className={styles.btn}>詳細</button>
					<button className={styles.btn} onClick={() => hondleCreateBook()}>
						<Image src="/plus.svg" width="18" height="18" alt="plus" />
						本棚に追加
					</button>
				</div>
			</div>

			{/* みんなのアウトプット */}
			<Outputs outputs={outputs} />
		</main>
	)
}

Home.getLayout = page => <Layout>{page}</Layout>

export default Home
