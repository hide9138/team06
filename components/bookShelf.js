import Image from 'next/image'
import styles from '../styles/components/bookShelf.module.css'

const BookShelf = ({ books }) => {
	return (
		<div className={styles.bookshelf__container}>
			{books.map((book, i) => (
				<div key={Math.random()} className={`${styles.bookshelf__book__image} ${i % 3 === 0 && styles.first__row__item}`}>
					<Image className={styles.bookImage} src={book.imageLink} width="135" height="182" alt="book image" />
				</div>
			))}
		</div>
	)
}

export default BookShelf
