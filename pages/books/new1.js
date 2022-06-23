import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import styles from '../../styles/books/New1.module.css'

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
const books = [
	'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png',
	'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png',
	'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png',
	'https://static.overlay-tech.com/assets/aad3ed2f-167e-4cf8-b56d-fbdd2d1294a8.png',
	'https://static.overlay-tech.com/assets/aad3ed2f-167e-4cf8-b56d-fbdd2d1294a8.png',
	'https://static.overlay-tech.com/assets/aad3ed2f-167e-4cf8-b56d-fbdd2d1294a8.png',
	'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png',
	'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png',
	'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png',
]

const BookShelf = () => {
	return (
		<div className={styles.BookShelf}>
			<div className={styles.bookShelfContainer}>
				{books.map((book, i) => (
					<div key={Math.random()} className={`${styles.bookShelfImage} ${i % 3 === 0 && styles.firstRowImage}`}>
						<Image className={styles.bookImage} src={book} width="135" height="182" alt="book photo" />
					</div>
				))}
			</div>
		</div>
	)
}
