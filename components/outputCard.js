import React from 'react'
import Image from 'next/image'
import styles from '../styles/components/outputCard.module.css'
import Link from 'next/link'

const OutputCard = ({ key, output }) => {
	console.log(output)
	return (
		<div key={key} className={styles.content__output}>
			{/* User */}

			<div className={styles.user__container}>
				<div className={styles.user__image__area}>
					<Link href={`/users/${output.user.id}`}>
						<Image src={output.user.photoURL} width={50} height={50} alt="user photo" className={styles.user__image} />
					</Link>
				</div>
				<div className={styles.user__info}>
					<p className={styles.user__name}>{output.user.displayName}</p>
					<p className={styles.output__words}>
						<span>P. {output.tweet.pageNumber}</span>
						<span>{`「${output.tweet.word1}」`}</span>
						<span>{`「${output.tweet.word2}」`}</span>
						<span>{`「${output.tweet.word3}」`}</span>
					</p>
				</div>
			</div>

			{/* Book */}
			<div className={styles.book__container}>
				<div className={styles.book__image__area}>
					<Link href={`/books/${output.book.id}`}>
						<Image src={output.book.imageLink} width={72} height={100} alt="user photo" className={styles.book__image} />
					</Link>
				</div>
				<div className={styles.book__info}>
					<p>{output.book.title}</p>
					<p>著者名：{output.book.authors.join(', ')}</p>
				</div>
			</div>

			{/* Button */}
			<div className={styles.btn__container}>
				<div className={styles.btn}>
					<Image src="https://static.overlay-tech.com/assets/dea603c0-b98a-4f6f-89ff-861082b18421.svg" width="16" height="16" alt="like" />
					<p className={styles.count}>6</p>
				</div>
			</div>
		</div>
	)
}

export default OutputCard
