import React, { useState, useEffect } from 'react'
import axios from 'axios'

const format = item => {
	const info = item.volumeInfo
	return {
		id: item.id || '',
		title: info.title || '',
		authors: info.authors || '',
		description: info.description || '',
		pageCount: info.pageCount || '',
		publisher: info.publisher || '',
		publishedDate: info.publishedDate || '',
		smallImageLink: info.imageLinks ? info.imageLinks.smallThumbnail : '',
		imageLink: info.imageLinks ? info.imageLinks.thumbnail : '',
	}
}

export const getBook = async (bookId, updateState) => {
	const url = 'https://www.googleapis.com/books/v1/volumes/' + bookId
	const result = await axios(url)
	const item = result.data
	const bookDetail = format(item)
	console.log(bookDetail)
	if (bookDetail.publishedDate) bookDetail.publishedDate = bookDetail.publishedDate.replace('-', '/')
	if (bookDetail.description) bookDetail.description = bookDetail.description.replace(/(<([^>]+)>)/gi, '')
	if (bookDetail.description && bookDetail.description.length > 200) bookDetail.description = bookDetail.description.substr(0, 200) + '...'
	updateState(bookDetail)
}

export const SerchBooks = serchWord => {
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
