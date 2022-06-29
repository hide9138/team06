import React from 'react'
import Image from 'next/image'
import styles from '../styles/components/bookCard.module.css'

// props の型メモ
// type Book = {
//   id: string
//   title: string
//   authors: string
//   description: string
//   pageCount: number
//   smallImageLink: string
//   imageLink: string
// }

const BookCard = ({ book }) => {
  return (
    <div className={styles.book__card}>
      <div className={styles.book__info}>
        <div className={styles.book__image__area}>         
          {book.imageLink && <Image src={book.imageLink} width={120} height={170} alt="book image" className={styles.book__image} />}
        </div>
        <div className={styles.book__details}>
          {book.title && <p>{book.title}</p>}
          {book.authors && <p>著者：{book.authors}</p>}
        </div>
      </div>
    </div>
  )
}

export default BookCard;