import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../styles/books/New1.module.css'
import firebase, { db } from '../../firebase/firebase'
import { useAuth } from '../../components/AuthContext'

export default function Home() {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<div className={styles.title}>
					<h1>本棚から本を選んでください</h1>
				</div>
				<BookShelf />
			</div>
		</div>
	)
}

// 本棚用（仮）
const bookList = [
	{ id: 'LCIbnwEACAAJ', imageLink: 'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png' },
	{ id: 'LCIbnwEACAAJ', imageLink: 'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png' },
	{ id: 'LCIbnwEACAAJ', imageLink: 'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png' },
	{ id: 'LCIbnwEACAAJ', imageLink: 'https://static.overlay-tech.com/assets/aad3ed2f-167e-4cf8-b56d-fbdd2d1294a8.png' },
	{ id: 'LCIbnwEACAAJ', imageLink: 'https://static.overlay-tech.com/assets/aad3ed2f-167e-4cf8-b56d-fbdd2d1294a8.png' },
	{ id: 'LCIbnwEACAAJ', imageLink: 'https://static.overlay-tech.com/assets/aad3ed2f-167e-4cf8-b56d-fbdd2d1294a8.png' },
	{ id: 'LCIbnwEACAAJ', imageLink: 'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png' },
	{ id: 'LCIbnwEACAAJ', imageLink: 'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png' },
	{ id: 'LCIbnwEACAAJ', imageLink: 'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png' },
]

const BookShelf = () => {
	const [books, setBooks] = useState(bookList)
	const { currentUser } = useAuth()

	useEffect(() => {
		const userRef = db.collection('users').doc(currentUser.uid)
		const userBooks = db.collection('books').where('userRef', '==', userRef).get()
		console.log(userBooks)
		// setBooks(userBooks)
		return
	}, [])

	return (
		<div className={styles.BookShelf}>
			<div className={styles.bookShelfContainer}>
				{books.map((book, i) => (
					<div key={book.id} className={`${styles.bookShelfImage} ${i % 3 === 0 && styles.firstRowImage}`}>
						<Link href={{ pathname: `/books/new2`, query: { book_id: book.id } }}>
							<Image className={styles.bookImage} src={book.imageLink} width="135" height="182" alt="book photo" />
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}
