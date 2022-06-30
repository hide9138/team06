import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../styles/books/New1.module.css'
import firebase, { db } from '../../firebase/firebase'
import { useAuth } from '../../components/AuthContext'
import Modal from '../../components/modal'

export default function Home() {
	// 選択された書籍のid
	const [bookId, setBookId] = useState(null)
	// 選択された本の情報
	const [book, setBook] = useState(null)

	const [tweet, setTweet] = useState({ pageNumber: '', word1: '', word2: '', word3: '' })

	const router = useRouter()
	const handleCloseButton = () => {
		router.push('/users/mypage')
	}

	// modal
	const [isOpen, setIsOpen] = useState(false)

	const handleClose = () => {
		setBookId(null)
		setIsOpen(false)
	}

	useEffect(() => {
		if (!bookId) return

		const getBookData = async () => {
			const book = await db.collection('books').doc(bookId).get()
			setBook(book.data())

			setIsOpen(true)
		}

		getBookData()
	}, [bookId])

	const { currentUser } = useAuth()

	const hondleCreateBook = () => {
		if (Object.values(tweet).every(v => v)) {
			const userRef = db.collection('users').doc(currentUser.uid)
			const bookRef = db.collection('books').doc(bookId)

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
		} else {
			window.alert('空欄を埋めてください')
		}
	}

	const Content = ({ handleClose }) => (
		<div className={styles.form}>
			<div className="batsu" style={{ position: 'absolute', margin: '2rem', cursor: 'pointer' }} onClick={handleClose}>
				<Image src="/x.svg" width="30" height="30" alt="icon" />
			</div>
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
					<p className={styles.text} onClick={hondleCreateBook}>
						アウトプット
					</p>
				</button>
			</div>
		</div>
	)

	return (
		<div className={styles.container}>
			<div className={styles.close__button} onClick={handleCloseButton}>
				<div>
					<Image src="/x.svg" width="30" height="30" alt="icon" />
				</div>
			</div>
			<div className={styles.main}>
				<div className={styles.title}>
					<h1>本棚から本を選んでください</h1>
				</div>
				<BookShelf setBookId={setBookId} />

				<Modal isOpen={isOpen} handleClose={handleClose} content={Content({ handleClose })} />
			</div>
		</div>
	)
}

const BookShelf = ({ setBookId }) => {
	const [books, setBooks] = useState([])
	const { currentUser } = useAuth()

	useEffect(() => {
		const userRef = db.collection('users').doc(currentUser.uid)
		db.collection('books')
			.where('userRef', '==', userRef)
			.get()
			.then(querySnapshot => {
				const bookList = querySnapshot.docs.map(doc => {
					return { id: doc.id, data: doc.data() }
				})
				setBooks(bookList)
			})
		return
	}, [currentUser])

	return (
		<div className={styles.BookShelf}>
			<div className={styles.bookShelfContainer}>
				{books.map((book, i) => (
					<div key={book.id} className={`${styles.bookShelfImage} ${i % 3 === 0 && styles.firstRowImage}`}>
						<div onClick={() => setBookId(book.id)}>
							<Image className={styles.bookImage} src={book.data.imageLink} width="135" height="182" alt="book photo" />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

const BookCard = ({ props }) => {
	const book = props.book || props.book
	const description = book.description?.replace(/(<[^>]*>)/g, '')

	return (
		<div className={styles.bookCard}>
			<div className={styles.flexWrapperFour}>
				{book.imageLink && <Image className={styles.num2022061316151} src={book.imageLink} width="159" height="229" alt="book" />}

				<div className={styles.flexWrapperFive}>
					<p className={styles.bookTitle}>{book.title}</p>
					<p className={styles.author}>{book.authors}</p>
				</div>
			</div>
			<div className={styles.descriptionWrapper}>
				<p className={styles.booksapidescription}>
					{/* html タグの仮排除処理 */}
					{`${description?.slice(0, 200)}${description?.length >= 200 ? '...' : ''}`}
				</p>
			</div>
		</div>
	)
}
