import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import firebase, { db } from '../../firebase/firebase'
import styles from '../../styles/books/New2.module.css'

const bookRef = {
	id: 'LCIbnwEACAAJ',
	title: '本のタイトル',
	authors: 'Daigo',
	description: 'testtesttesttest',
	imageLink: 'https://static.overlay-tech.com/assets/8fcdb0ac-9c3a-436c-883e-6249e0f97503.png',
}

export default function Home() {
	const [pageNumber, setPageNumber] = useState('')
	const [word1, setWord1] = useState('')
	const [word2, setWord2] = useState('')
	const [word3, setWord3] = useState('')
	const query = useRouter().query
	const bookId = query.book_id
	// const bookRef = db.collection('books').doc(bookId)
	const router = useRouter()

	const hondleCreateBook = props => {
		const tweet = props.tweet
		db.collection('tweets')
			.add({
				pageNumber: Number(tweet.pageNumber),
				word1: tweet.word1,
				word2: tweet.word2,
				word3: tweet.word3,
				bookrRef: bookRef,
				createTime: firebase.firestore.FieldValue.serverTimestamp(),
				updateTime: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.then(() => {
				console.log('成功！')
			})
			.catch(error => {
				console.log(error)
			})
		router.push('../books/')
	}

	return (
		<div className={styles.container}>
			<div className="batsu"></div>
			<div className={styles.row}>
				<p className={styles.num3}>3ワードアウトプット</p>
			</div>
			<div className={styles.row}>
				<BookCard />
			</div>

			<div className={styles.row}>
				<div className={styles.flexWrapperTwo}>
					<div className={styles.p}>p.</div>
					<input
						type="text"
						className={styles.rectangle22}
						onChange={e => {
							setPageNumber(e.target.value)
						}}
					/>
				</div>
			</div>

			<div className={styles.row}>
				<div className={styles.flexWrapperThree}>
					<input
						type="text"
						className={styles.rectangle19}
						onChange={e => {
							setWord1(e.target.value)
						}}
					/>
					<input
						type="text"
						className={styles.rectangle19}
						onChange={e => {
							setWord2(e.target.value)
						}}
					/>
					<input
						type="text"
						className={styles.rectangle19}
						onChange={e => {
							setWord3(e.target.value)
						}}
					/>
				</div>
			</div>
			<div className={styles.row}>
				<button className={styles.group36}>
					<p
						className={styles.text}
						onClick={() =>
							hondleCreateBook({
								tweet: {
									pageNumber: pageNumber,
									word1: word1,
									word2: word2,
									word3: word3,
								},
							})
						}
					>
						アウトプット
					</p>
				</button>
			</div>
		</div>
	)
}

const BookCard = () => {
	return (
		<div className={styles.bookCard}>
			<div className={styles.flexWrapperFour}>
				<Image className={styles.num2022061316151} src={bookRef.imageLink} width="159" height="229" alt="book" />

				<div className={styles.flexWrapperFive}>
					<p className={styles.title}>{bookRef.title}</p>
					<p className={styles.author}>{bookRef.authors}</p>
				</div>
			</div>
			<p className={styles.booksapidescription}>{bookRef.description}</p>
		</div>
	)
}
