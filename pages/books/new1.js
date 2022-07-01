import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../styles/books/New1.module.css'
import firebase, { db } from '../../firebase/firebase'
import { useAuth } from '../../components/AuthContext'
import { serchBooks } from '../../components/bookApiFetch'
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

	const [results, setResults] = useState([])

	const [isSearched, setIsSearched] = useState(false)

	// modal
	const [isOpen, setIsOpen] = useState(false)
	const [searchisOpen, setSearchIsOpen] = useState(false)

	const handleSearchStart = () => {
		setSearchIsOpen(true)
	}

	const handleClose = () => {
		setBookId(null)
		setIsOpen(false)
	}

	const handleSearchClose = () => {
		setSearchIsOpen(false)
	}

	useEffect(() => {
		const getBookData = async () => {
			const book = await db.collection('books').doc(bookId).get()
			setBook(book.data())
			setIsOpen(true)
		}

		if (bookId) getBookData()
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

	const handleSearch = async searchWord => {
		setIsSearched(true)
		serchBooks(searchWord, setResults)
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

	const ContentSearch = ({ handleSearchClose }) => (
		<div className={styles.searchModal}>
			<div className={styles.book__search}>
				<div className={styles.search__container}>
					<div className={styles.search__icon}>
						<Image src="/search.svg" width="16" height="16" alt="search icon" />
					</div>
					<input
						className={styles.search__input}
						type="text"
						placeholder="本のタイトル、著者名"
						onKeyPress={e => {
							if (e.key == 'Enter') {
								handleSearch(e.target.value)
							}
						}}
					/>
				</div>
				{results.map(
					(result, i) =>
						result && (
							<div className={`${results.length - 1 === i && styles.content__result__last}`} key={result.id}>
								<a>
									<div className={styles.row}>
										<BookCardSearch key={i} book={result} handleSearchClose={handleSearchClose} />
									</div>
								</a>
							</div>
						)
				)}
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
			<div className={styles.plus} onClick={handleSearchStart}>
				<div>
					<Image src="/plusButton.svg" width="100" height="100" alt="icon" />
				</div>
			</div>
			<div className={styles.main}>
				<div className={styles.title}>
					<h1>本棚から本を選んでください</h1>
				</div>
				<BookShelf setBookId={setBookId} booksSet={searchisOpen} />

				<Modal isOpen={isOpen} handleClose={handleClose} content={Content({ handleClose })} />

				<Modal isOpen={searchisOpen} handleClose={handleSearchClose} content={ContentSearch({ handleSearchClose })} />
			</div>
		</div>
	)
}

const BookShelf = ({ setBookId, booksSet }) => {
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
		console.log('本棚更新')
	}, [currentUser, booksSet])

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

const BookCardSearch = ({ book, handleSearchClose }) => {
	const router = useRouter()
	const { currentUser } = useAuth()
	const handleaddBook = async book => {
		const userRef = db.collection('users').doc(currentUser.uid)
		const id = book.id
		const bookRefs = await db.collection('books').where('userRef', '==', userRef).where('id', '==', id).get()
		if (bookRefs.docs.length === 0) {
			await db.collection('books').add({
				authors: book.authors || '',
				description: book.description || '',
				id: book.id || '',
				imageLink: book.imageLink || '',
				title: book.title || '',
				pageCount: book.pageCount || '',
				publisher: book.publisher || '',
				publishedDate: book.publishedDate || '',
				smallImageLink: book.imageLink || '',
				userRef: userRef,
				createTime: firebase.firestore.FieldValue.serverTimestamp(),
			})
			handleSearchClose()
		} else {
			window.alert('すでに本棚に同じ本が存在しています')
		}
	}
	return (
		<div className={styles.bookCard}>
			<div className={styles.flexWrapperFour}>
				{book.imageLink && <Image className={styles.num2022061316151} src={book.imageLink} width="159" height="229" alt="book" />}

				<div className={styles.flexWrapperFive}>
					<p className={styles.bookTitle}>{book.title}</p>
					<p className={styles.author}>{book.authors}</p>
				</div>
				<div className={styles.flexWrapperSix}>
					<button className={styles.btn} onClick={() => handleaddBook(book)}>
						<Image src="/plus.svg" width="18" height="18" alt="plus" />
						本棚に追加
					</button>
				</div>
			</div>
		</div>
	)
}
