import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BookCard from './bookCard'
import styles from '../styles/components/bookSearch.module.css'


// type Book = {
//   id: string
//   title: string
//   authors: string
//   description: string
//   pageCount: number
//   smallImageLink: string
//   ImageLink: string
// }

const _results = [
  {
    id: 'fwaojf3wpjwnlw',
    title: '本のタイトル',
    authors: 'うんこまん',
    description: '',
    pageCount: 100,
    smallImageLink: "",
    ImageLink: 'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png',
  },
  {
    id: 'woawjofapwjw30ur',
    title: '本のタイトル',
    authors: 'うんこまん',
    description: '',
    pageCount: 100,
    smallImageLink: "",
    ImageLink: 'https://static.overlay-tech.com/assets/aad3ed2f-167e-4cf8-b56d-fbdd2d1294a8.png',
  },
]

const BookSearchbar = () => {
  // Book API から取得した結果用
  const [results, setResults] = useState(_results)
  // 入力値のデータ
  const [searchWord, setSearchWord] = useState("")

  const handleSearch = async () => {
    if (!searchWord) return;

    const searchedResults = await GetBooks(searchWord);
    setResults(searchedResults)
  }


  return (
    <div className={styles.book__search}>
      <div className={styles.search__container}>
        <div className={styles.search__icon}>
          <Image src="/search.svg" width="16" height="16" alt="search icon" />
        </div>
        <input className={styles.search__input} type="text" placeholder="本のタイトル、著者名" onClick={(e) => setSearchWord(e.target.value)} />
      </div>
      <div>
        <p className={styles.title}>本を探す</p>
      </div>
      {results.map((result, i) => (
        <div className={`${results.length - 1 === i && styles.content__result__last}`} key={result.id}>
          <Link href={`/books/${result.id}`}>
            <a>
              <BookCard key={i} book={result} />
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BookSearchbar;