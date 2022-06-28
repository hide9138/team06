import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../styles/books/Home.module.css'
import { useAuth } from '../../components/AuthContext'
import OutputCard from '../../components/outputCard'
import Layout from '../../components/layout'
import { GetBook } from '../../components/BookApiFetch'
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
	const bookRef = db.collection('books').doc(id)
	const [outputs, setOutputs] = useState([])
	const [book, setBook] = useState([])
	const item = GetBook('LCIbnwEACAAJ')
	console.log(item)

	const { currentUser } = useAuth()

	useEffect(() => {
		const getOutputs = async () => {
			const tweetRefs = await db.collection('tweets').where('bookRef', '==', bookRef).orderBy('updateTime', 'desc').get()
			const tweetList = tweetRefs.docs.map(querySnapshot => querySnapshot.data())

			const userRefs = await db.collection('users').get()
			const userList = userRefs.docs.map(querySnapshot => {
				return { mainId: querySnapshot.id, ...querySnapshot.data() }
			})

			const bookRefs = await db.collection('books').get()
			const bookList = bookRefs.docs.map(querySnapshot => {
				return { mainId: querySnapshot.id, ...querySnapshot.data() }
			})

			const outputs = tweetList.map(tweet => {
				const user = userList.filter(user => user.mainId == tweet.userRef.id)[0]
				const book = bookList.filter(book => book.mainId == tweet.bookRef.id)[0]
				return { user, tweet, book }
			})

			setOutputs(outputs)
		}
		const getBook = async () => {
			const bookDoc = await bookRef.get()
			setBook(bookDoc.data())
		}
		getBook()
		getOutputs()
	}, [bookRef])

	if (!currentUser) {
		return <></>
	}

	const hondleCreateBook = () => {
		const userRef = db.collection('users').doc(currentUser.uid)
		db.collection('books').add({
			...item,
			userRef: userRef,
			createTime: firebase.firestore.FieldValue.serverTimestamp(),
		})
		router.push('./new1/')
	}

	return (
		<main className={styles.main}>
			<div className={styles.title__container}>
				<h1 className={styles.title}>本の詳細</h1>
			</div>

			<div className={styles.book__info__container}>
				{book.mainId && (
					<div className={styles.book__info__block}>
						<div className={styles.book__info__book__image__area}>
							<Image src={book.imageLink} width="220" height="300" alt="book image" className={styles.book__info__book__image} />
						</div>
						<div className={styles.book__info__basic__info}>
							<p className={styles.book__info__title}>{book.title}</p>
							<p className={styles.book__info__author}>著者名：{book.authors.join(', ')}</p>
							<p className={styles.book__info__publisher}>出版社: {book.publisher}</p>
							<p className={styles.book__info__publisher}>{book.publishDate}</p>
						</div>
					</div>
				)}
				<div>
					<p className={styles.book__info__description}>{book.description}</p>
				</div>
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
