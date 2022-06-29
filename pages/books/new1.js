import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../styles/books/New1.module.css'
import { db } from '../../firebase/firebase'
import { useAuth } from '../../components/AuthContext'

export default function Home() {
	const router = useRouter()
	const handleCloseButton = () => {
		router.push('/users/mypage')
	}
	return (
		<div className={styles.container}>
			<div className={styles.close__button} onClick={handleCloseButton}>
				×
			</div>
			<div className={styles.main}>
				<div className={styles.title}>
					<h1>本棚から本を選んでください</h1>
				</div>
				<BookShelf />
			</div>
		</div>
	)
}

const BookShelf = () => {
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
						<Link href={{ pathname: `/books/new2`, query: { book_id: book.id } }}>
							<a>
								<Image className={styles.bookImage} src={book.data.imageLink} width="135" height="182" alt="book photo" />
							</a>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}
