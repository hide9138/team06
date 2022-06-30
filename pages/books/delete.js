import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../styles/books/Admin.module.css'
import { db } from '../../firebase/firebase'
import { useAuth } from '../../components/AuthContext'

export default function Home() {
	const router = useRouter()

	const handleCloseButton = () => {
		router.push('/users/mypage')
	}
	return (
		<div className={styles.container}>
			<div className={styles.close__back__button} onClick={handleCloseButton}>
				×
			</div>
			<div className={styles.main}>
				<div className={styles.title}>
					<h1>削除したい本を選んでください</h1>
				</div>
				<BookShelf />
			</div>
		</div>
	)
}

const BookShelf = () => {
	const [books, setBooks] = useState([])
	const { currentUser } = useAuth()
	const userRef = db.collection('users').doc(currentUser.uid)

	const handleDeleteButton = async bookId => {
		const flag = window.confirm('本当に削除しますか？')
		if (flag) {
			await deleteBook(bookId)
			getBooks()
		}
	}

	const deleteBook = async bookId => {
		const bookRef = db.collection('books').doc(bookId)

		const tweetRefs = await db.collection('tweets').where('bookRef', '==', bookRef).get()
		const tweetRefList = tweetRefs.docs.map(querySnapshot => querySnapshot.ref)

		//like削除
		tweetRefList.forEach(async tweetRef => {
			const likeRefs = await db.collection('likes').where('tweetRef', '==', tweetRef).get()
			likeRefs.docs.forEach(async doc => {
				await doc.ref.delete()
			})
		})
		//tweet削除
		tweetRefs.docs.forEach(async doc => {
			await doc.ref.delete()
		})
		//book削除
		bookRef.delete()
		console.log('削除成功')
	}
	const getBooks = async () => {
		const bookCols = await db.collection('books').where('userRef', '==', userRef).get()
		const bookList = bookCols.docs.map(doc => {
			return { mainId: doc.id, data: doc.data() }
		})
		setBooks(bookList)
	}

	useEffect(() => {
		getBooks()
	}, [])

	return (
		<div className={styles.BookShelf}>
			<div className={styles.bookShelfContainer}>
				{books.map((book, i) => (
					<div key={book.mainId} className={`${styles.bookShelfImage} ${i % 5 === 0 && styles.firstRowImage}`}>
						<Link href={{ pathname: `/books/new2`, query: { book_id: book.id } }}>
							<a>
								<Image className={styles.bookImage} src={book.data.imageLink} width="135" height="182" alt="book photo" />
							</a>
						</Link>
						<div className={styles.close__button} onClick={() => handleDeleteButton(book.mainId)}>
							×
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
