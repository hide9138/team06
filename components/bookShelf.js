import React from 'react'
import Image from 'next/image'
import styles from '../styles/components/bookShelf.module.css'

const book1 = 'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png'
const book2 = 'https://static.overlay-tech.com/assets/aad3ed2f-167e-4cf8-b56d-fbdd2d1294a8.png'

let books = new Array(9).fill(book1)
books.fill(book2, 3, 6)


const BookShelf = () => {
  return (
    <div className={styles.bookshelf__container}>
      {books.map((book, i) => (
        <div key={Math.random()} className={`${styles.bookshelf__book__image} ${i % 3 === 0 && styles.first__row__item}`}>
          <Image className={styles.bookImage} src={book} width="135" height="182" alt="book image" />
        </div>
      ))}
    </div>
  )
}

export default BookShelf;
