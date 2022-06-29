import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import firebase, { db } from '../../../firebase/firebase'
import { useAuth } from '../../../components/AuthContext'
import styles from '../../../styles/books/New2.module.css'

export default function Home() {
	const router = useRouter()
	const [book, setBook] = useState([])
	const [tweet, setTweet] = useState([])
	const tweetId = useRouter().query.id
	const tweetRef = db.collection('tweets').doc(tweetId)
	const { currentUser } = useAuth()

	useEffect(() => {
		const getTweetBook = async () => {
			const tweetSnapshot = await tweetRef.get()
			const bookRef = tweetSnapshot.data().bookRef
			const bookSnapshot = await bookRef.get()
			setTweet(tweetSnapshot.data())
			setBook(bookSnapshot.data())
		}
		getTweetBook()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const hondleCreateBook = () => {
		db.collection('tweets')
			.doc(tweetId)
			.update({
				pageNumber: Number(tweet.pageNumber),
				word1: tweet.word1,
				word2: tweet.word2,
				word3: tweet.word3,
				updateTime: firebase.firestore.FieldValue.serverTimestamp(),
			})
		router.push(`/users/${currentUser.uid}?tab=1`)
	}

	if (!currentUser) {
		return <></>
	}

	return (
		<div className={styles.container}>
			<div className="batsu"></div>
			<div className={styles.row}>
				<p className={styles.num3}>3ワードアウトプット</p>
			</div>
			<div className={styles.row}>
				<BookCard props={{ book }} />
			</div>

			<div className={styles.row}>
				<div className={styles.flexWrapperTwo}>
					<div className={styles.p}>p.</div>
					<input
						type="text"
						className={styles.rectangle22}
						value={tweet.pageNumber || ''}
						onChange={e => setTweet({ ...tweet, pageNumber: e.target.value })}
					/>
				</div>
			</div>

			<div className={styles.row}>
				<div className={styles.flexWrapperThree}>
					<input
						type="text"
						className={styles.rectangle19}
						value={tweet.word1 || ''}
						onChange={e => setTweet({ ...tweet, word1: e.target.value })}
					/>
					<input
						type="text"
						className={styles.rectangle19}
						value={tweet.word2 || ''}
						onChange={e => setTweet({ ...tweet, word2: e.target.value })}
					/>
					<input
						type="text"
						className={styles.rectangle19}
						value={tweet.word3 || ''}
						onChange={e => setTweet({ ...tweet, word3: e.target.value })}
					/>
				</div>
			</div>
			<div className={styles.row}>
				<button className={styles.group36}>
					<p className={styles.text} onClick={() => hondleCreateBook()}>
						アウトプット
					</p>
				</button>
			</div>
		</div>
	)
}

const BookCard = ({ props }) => {
	const book = props.book || props.book
	return (
		<div className={styles.bookCard}>
			<div className={styles.flexWrapperFour}>
				{book.imageLink && <Image className={styles.num2022061316151} src={book.imageLink} width="159" height="229" alt="book" />}

				<div className={styles.flexWrapperFive}>
					<p className={styles.title}>{book.title}</p>
					<p className={styles.author}>{book.authors}</p>
				</div>
			</div>
			<p className={styles.booksapidescription}>{book.description}</p>
		</div>
	)
}
