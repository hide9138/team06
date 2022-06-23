import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const GetBook = bookId => {
	const [book, setBook] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const url = 'https://www.googleapis.com/books/v1/volumes/' + bookId
			const result = await axios(url)
			const item = result.data
			const outData = {
				id: item.id,
				title: item.volumeInfo.title,
				authors: item.volumeInfo.authors,
				description: item.volumeInfo.description,
				pageCount: item.volumeInfo.pageCount,
				smallImageLink: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : '',
				ImageLink: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '',
			}
			setBook(outData)
		}
		fetchData()
	}, [bookId])

	return book
}

export const SerchBooks = serchWord => {
	const [books, setBooks] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const url = `https://www.googleapis.com/books/v1/volumes/?q=${serchWord}&maxResults=2&key=${process.env.NEXT_PUBLIC_BOOK_API_KEY}`
			const result = await axios(url)
			const items = result.data.items
			const outData = items.map(item => {
				return {
					id: item.id,
					title: item.volumeInfo.title,
					authors: item.volumeInfo.authors,
					description: item.volumeInfo.description,
					pageCount: item.volumeInfo.pageCount,
					smallImageLink: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : '',
					ImageLink: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '',
				}
			})
			setBooks(outData)
		}
		fetchData()
	}, [serchWord])

	return books
}
