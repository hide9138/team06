import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../styles/books/Home.module.css'
import { useAuth } from '../../components/AuthContext'
import OutputCard from '../../components/outputCard'
import Layout from '../../components/layout'
import { GetBook } from '../../components/BookApiFetch'
import firebase, { db } from '../../firebase/firebase'

const output = {
	userPhotoUrl: 'https://static.overlay-tech.com/assets/3d3c257d-25ef-46ac-8f50-17b6d4792414.png',
	userName: '伊藤マイケル',
	page: 24,
	word1: '失敗',
	word2: '貴重な学び',
	word3: '成功の可能性',
	bookPhotoUrl: 'https://static.overlay-tech.com/assets/8fcdb0ac-9c3a-436c-883e-6249e0f97503.png',
	bookTitle: '本のタイトル',
	bookAuthor: '',
}

const outputs = new Array(5).fill(output)

const Outputs = () => {
	return (
		<div className={styles.contents__container}>
			{outputs.map((output, i) => (
				<OutputCard key={i} output={output} />
			))}
		</div>
	)
}

const Home = () => {
	const { id } = useRouter().query
	const { currentUser } = useAuth()
	const item = GetBook('LCIbnwEACAAJ')
	const router = useRouter()

	if (!currentUser) {
		return <></>
	}

	const hondleCreateBook = () => {
		const userRef = db.collection('users').doc(currentUser.uid)
		db.collection('books').add({
			id: item.id,
			title: item.title,
			authors: item.authors,
			description: item.description,
			pageCount: item.pageCount,
			smallImageLink: item.smallImageLink,
			imageLink: item.imageLink,
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
				<div className={styles.book__info__block}>
					<div className={styles.book__info__book__image__area}>
						<Image
							src="https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png"
							width="220"
							height="300"
							alt="book image"
							className={styles.book__info__book__image}
						/>
					</div>
					<div className={styles.book__info__basic__info}>
						<p className={styles.book__info__title}>本タイトル</p>
						<p className={styles.book__info__author}>著者　うんこまん</p>
						<p className={styles.book__info__publisher}>Publisher</p>
						<p className={styles.book__info__publish__date}>PublishDate</p>
					</div>
				</div>
				<div>
					<p className={styles.book__info__description}>説明(BooksAPIでいうdescription）</p>
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
			<Outputs />
		</main>
	)
}

Home.getLayout = page => <Layout>{page}</Layout>

export default Home
