import React, { useState, useEffect, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BookCard from './bookCard'
import styles from '../styles/components/bookSearch.module.css'
import firebase, { db } from '../firebase/firebase'
import axios from 'axios'
// import { SerchBooks } from './BookApiFetch'

// type Book = {
//   id: string
//   title: string
//   authors: string
//   description: string
//   pageCount: number
//   smallImageLink: string
//   ImageLink: string
// }
const SerchBooks = serchWord => {
	const [books, setBooks] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const url = `https://www.googleapis.com/books/v1/volumes/?q=${serchWord}&maxResults=2&key=${process.env.NEXT_PUBLIC_BOOK_API_KEY}`
			const result = await axios(url)
			const items = result.data.items
			const outData = items.map(item => format(item))
			setBooks(outData)
		}
		fetchData()
	}, [serchWord])

	return books
}

const BookSearchbar = memo(() => {
  // 入力値のデータ
  const [searchWord, setSearchWord] = useState("")
  // デフォルトデータと検索語のデータ用
  const [results, setResults] = useState([])

  const handleSearch = async (searchWord) => {
    const searchedResults = SerchBooks(searchWord);
    setResults(searchedResults)
  }

  useEffect(() => {
    const getResults = async () => {
      const bookRefs = await db.collection('books').get()
      const bookList = bookRefs.docs.map(querySnapshot => {
        return { ...querySnapshot.data(), id: querySnapshot.id }
      })
      const likeRefs = await db.collection('likes').get()
      let counts = new Map()
      likeRefs.docs.map(querySnapshot => {
        const tweetRef = querySnapshot.data().tweetRef.id
        if (counts.has(tweetRef)) {
          counts.set(tweetRef, counts.get(tweetRef) + 1)
        } else {
          counts.set(tweetRef, 1)
        }
      })

			counts[Symbol.iterator] = function* () {
				yield* [...this.entries()].sort((a, b) => b[1] - a[1])
			}

			const results = Array.from(counts).map(([key, _]) => {
				const book = bookList.filter(book => book.mainId == key)[0]
				return book
			})

			// 取得したい分だけ取る
			setResults(results.slice(0, 6))
		}
		getResults()
	}, [])


  return (
    <div className={styles.book__search}>
      <div className={styles.search__container}>
        <div className={styles.search__icon}>
          <Image src="/search.svg" width="16" height="16" alt="search icon" />
        </div>
        <input className={styles.search__input} type="text" placeholder="本のタイトル、著者名" onChange={(e) => setSearchWord(e.target.value)} />
        <button value={searchWord} onClick={(e) => handleSearch(e.target.value)}>検索</button>
      </div>
      <div>
        <p className={styles.title}>本を探す</p>
      </div>
      {results.map((result, i) => (
        result && (
          <div className={`${results.length - 1 === i && styles.content__result__last}`} key={result.id}>
            <Link href={`/books/${result.id}`}>
              <a>
                <BookCard key={i} book={result} />
              </a>
            </Link>
          </div>
        )
      ))}
    </div>
  )
})

BookSearchbar.displayName = 'BookSearchbar'

export default BookSearchbar
