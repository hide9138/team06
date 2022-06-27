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
//   ImageLink: string
// }

const BookCard = ({ book }) => {
  return (
    <div className={styles.book__card}>
      <div className={styles.book__info}>
        <div className={styles.book__image__area}>
          <Image src={book.ImageLink} width={120} height={170} alt="book image" className={styles.book__image} />
        </div>
        <div className={styles.book__details}>
          <p>{book.title}</p>
          <p>著者：{book.authors}</p>
        </div>
      </div>
    </div>
  )
}

export default BookCard;