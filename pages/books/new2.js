import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import firebase, { db } from '../../firebase/firebase'
import { useAuth } from '../../components/AuthContext'
import styles from '../../styles/books/New2.module.css'

export default function Home() {
	const [tweet, setTweet] = useState({ pageNumber: '', word1: '', word2: '', word3: '' })
	const [book, setBook] = useState([])
	const bookId = useRouter().query.book_id
	const bookRef = db.collection('books').doc(bookId)

	useEffect(() => {
		bookRef.get().then(doc => setBook(doc.data()))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const router = useRouter()
	const { currentUser } = useAuth()

	const hondleCreateBook = () => {
		if (Object.values(tweet).every(v => v)) {
			const userRef = db.collection('users').doc(currentUser.uid)
			db.collection('tweets').add({
				pageNumber: Number(tweet.pageNumber),
				word1: tweet.word1,
				word2: tweet.word2,
				word3: tweet.word3,
				bookRef: bookRef,
				userRef: userRef,
				createTime: firebase.firestore.FieldValue.serverTimestamp(),
				updateTime: firebase.firestore.FieldValue.serverTimestamp(),
			})
			router.push(`/users/${currentUser.uid}?tab=1`)
		}
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
					<input type="text" className={styles.rectangle22} onChange={e => setTweet({ ...tweet, pageNumber: e.target.value })} />
				</div>
			</div>

			<div className={styles.row}>
				<div className={styles.flexWrapperThree}>
					<input
						type="text"
						className={styles.rectangle19}
						placeholder="Word1"
						onChange={e => setTweet({ ...tweet, word1: e.target.value })}
					/>
					<input
						type="text"
						className={styles.rectangle19}
						placeholder="Word2"
						onChange={e => setTweet({ ...tweet, word2: e.target.value })}
					/>
					<input
						type="text"
						className={styles.rectangle19}
						placeholder="Word3"
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
					{book.title && <p className={styles.title}>{book.title}</p>}
					{book.authors && <p className={styles.author}>{book.authors}</p>}
				</div>
			</div>
			{book.description && <p className={styles.booksapidescription}>{book.description}</p>}
		</div>
	)
}
