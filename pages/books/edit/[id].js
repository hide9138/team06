import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../../styles/books/Edit.module.css'

export default function Home() {
	return (
		<div className={styles.container}>
			{/* <img alt="" className={styles.line6} src="https://static.overlay-tech.com/assets/c41434ff-d656-4993-b856-51469eb48e95.png" />
			<img alt="" className={styles.line7} src="https://static.overlay-tech.com/assets/31e15f00-83d9-4ded-9c38-708594b53145.png" /> */}
			<div className={styles.row}>
				<p className={styles.num3}>3ワードアウトプット</p>
			</div>
			<div className={styles.row}>
				<BookCard />
			</div>

			<div className={styles.row}>
				<div className={styles.flexWrapperTwo}>
					<div className={styles.p}>p.</div>
					<div className={styles.rectangle22} />
				</div>
			</div>

			<div className={styles.row}>
				<KeywordForm />
			</div>
			<div className={styles.row}>
				<div className={styles.group36}>
					<p className={styles.text}>アウトプット</p>
				</div>
			</div>
		</div>
	)
}

const BookCard = () => {
	return (
		<div className={styles.bookCard}>
			<div className={styles.flexWrapperFour}>
				<img
					alt=""
					className={styles.num2022061316151}
					src="https://static.overlay-tech.com/assets/67e8a8e7-67fb-42de-83f4-ede6506fb8f8.png"
				/>
				<div className={styles.flexWrapperFive}>
					<p className={styles.title}>本タイトル</p>
					<p className={styles.author}>著者 うんこまん</p>
				</div>
			</div>
			<p className={styles.booksapidescription}>説明(BooksAPIでいうdescription）</p>
		</div>
	)
}

const KeywordForm = () => {
	return (
		<div className={styles.flexWrapperThree}>
			<div className={styles.rectangle19} />
			<div className={styles.rectangle19} />
			<div className={styles.rectangle19} />
		</div>
	)
}
