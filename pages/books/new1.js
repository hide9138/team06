import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import { GetBook, SerchBooks } from '../../components/BookApiFetch'

const Home = () => {
	// const [book, setBook] = useState([])

	const book = GetBook('LCIbnwEACAAJ')
	const test = SerchBooks('鬼滅')
	console.log(test)
	return (
		<div>
			<h1>fdsa</h1>
			<h1>{book.id}</h1>
			<h1>{book.authors}</h1>
			<h1>{book.title}</h1>
			<h1>{book.description}</h1>
			<h1>{book.pageCount}</h1>
			{/* <h1>{data.volumeInfo.imageLinks.smallThumbnail}</h1> */}
			{/* <div className="image">
				<Image src={data.volumeInfo.imageLinks.smallThumbnail} alt="Picture" width={70} height={100} />
			</div>
			<div className="image">
				<Image src={data.volumeInfo.imageLinks.thumbnail} alt="Picture" width={70} height={100} />
			</div> */}
		</div>
	)
}

export default Home
