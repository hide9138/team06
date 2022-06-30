import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/components/outputCard.module.css'
import Link from 'next/link'
import LikeButton from './likeButton'
import { useRouter } from 'next/router'
import { db } from '../firebase/firebase'
import { useAuth } from './AuthContext'

const OutputCard = ({ output, setIsDelete }) => {
	const { currentUser } = useAuth()
	const router = useRouter()
	const hondleEditTweetButton = () => {
		router.push(`/books/edit/${output.tweet.mainId}`)
	}
	const hondleDeleteTweetButton = async () => {
		const flag = window.confirm('本当に削除しますか？')
		if (flag) {
			await deleteTweet()
			router.push(`/users/mypage?tab=1`)
			setIsDelete(flag => !flag)
		}
	}
	const deleteTweet = async () => {
		console.log(output.tweet.mainId)
		const tweetRef = db.collection('tweets').doc(output.tweet.mainId)
		const tweetDoc = await tweetRef.get()
		const query = await db.collection('likes').where('tweetRef', '==', tweetDoc.ref).get()
		query.docs.forEach(async doc => {
			await doc.ref.delete()
		})
		tweetRef.delete()
	}

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
				{output.tweet.userRef.id == currentUser.uid && (
					<div className={styles.button__container}>
						<button className={styles.tweet__button} onClick={hondleEditTweetButton}>
							編集
						</button>
						<button className={styles.tweet__button} onClick={hondleDeleteTweetButton}>
							削除
						</button>
					</div>
				)}
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
