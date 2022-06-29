import React from 'react'
import Image from 'next/image'
import styles from '../styles/components/outputCard.module.css'
import Link from 'next/link'
import LikeButton from './likeButton'

const OutputCard = ({ output }) => {
	return (
		<div className={styles.content__output}>
			{/* User */}

			<div className={styles.user__container}>
				<Link href={`/users/${output.user.mainId}`}>
					<div className={styles.user__image__area}>
						<Image src={output.user.photoURL} width={50} height={50} alt="user photo" className={styles.user__image} />
					</div>
				</Link>
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
				<Link href={`/books/${output.book.id}`}>
					<div className={styles.book__image__area}>
						<Image src={output.book.imageLink} width={72} height={100} alt="user photo" className={styles.book__image} />
					</div>
				</Link>
				<div className={styles.book__info}>
					<p>{output.book.title}</p>
					<p>著者名：{output.book.authors.join(', ')}</p>
				</div>
			</div>

			{/* Button */}
			<div className={styles.btn__container}>
				<div className={styles.btn}>
					<LikeButton tweetRef={output.tweet.ref} />
				</div>
			</div>
		</div>
	)
}

export default OutputCard
