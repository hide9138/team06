import React, { useState, useEffect, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BookCard from './bookCard'
import styles from '../styles/components/bookSearch.module.css'
import firebase, { db } from '../firebase/firebase'

// type Book = {
//   id: string
//   title: string
//   authors: string
//   description: string
//   pageCount: number
//   smallImageLink: string
//   ImageLink: string
// }

const BookSearchbar = memo(() => {
	// デフォルトデータと検索語のデータ用
	const [results, setResults] = useState([])
	// 入力値のデータ
	const [searchWord, setSearchWord] = useState('')

	const handleSearch = async () => {
		if (!searchWord) return

		const searchedResults = await GetBooks(searchWord)
		setResults(searchedResults)
	}

	useEffect(() => {
		const getResults = async () => {
			const bookRefs = await db.collection('books').get()
			const bookList = bookRefs.docs.map(querySnapshot => {
				return { ...querySnapshot.data(), id: querySnapshot.id }
			})
			const tweetRefs = await db.collection('tweets').get()
			let counts = new Map()
			tweetRefs.docs.map(querySnapshot => {
				const bookRef = querySnapshot.data().bookRef.id
				if (counts.has(bookRef)) {
					counts.set(bookRef, counts.get(bookRef) + 1)
				} else {
					counts.set(bookRef, 1)
				}
			})

			counts[Symbol.iterator] = function* () {
				yield* [...this.entries()].sort((a, b) => b[1] - a[1])
			}

			const results = Array.from(counts).map(([key, _]) => {
				const book = bookList.filter(book => book.id == key)[0]
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
				<input
					className={styles.search__input}
					type="text"
					placeholder="本のタイトル、著者名"
					onClick={e => setSearchWord(e.target.value)}
				/>
			</div>
			<div>
				<p className={styles.title}>本を探す</p>
			</div>
			{results.map(
				(result, i) =>
					result && (
						<div className={`${results.length - 1 === i && styles.content__result__last}`} key={result.id}>
							<Link href={`/books/${result.id}`}>
								<a>
									<BookCard key={i} book={result} />
								</a>
							</Link>
						</div>
					)
			)}
		</div>
	)
})

BookSearchbar.displayName = 'BookSearchbar'

export default BookSearchbar
