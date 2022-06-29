import Image from 'next/image'
import styles from '../styles/components/bookShelf.module.css'
import Link from 'next/link'

const BookShelf = ({ books }) => {
	return (
		<div className={styles.bookshelf__container}>
			{books.map((book, i) => (
				<div key={Math.random()} className={`${styles.bookshelf__book__image} ${i % 3 === 0 && styles.first__row__item}`}>
					<Link href={`/books/${book.id}`}>
						<a>
							<Image className={styles.bookImage} src={book.imageLink} width="135" height="182" alt="book image" />
						</a>
					</Link>
				</div>
			))}
		</div>
	)
}

export default BookShelf
