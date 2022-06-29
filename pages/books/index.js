import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../../styles/Homepage.module.css'
import { useAuth } from '../../components/AuthContext'
import Layout from '../../components/layout'
import { db } from '../../firebase/firebase'
import Link from 'next/link'
import LikeButton from '../../components/likeButton'

const Home = () => {
	const { currentUser } = useAuth()
	const [outputs, setOutputs] = useState([])

	useEffect(() => {
		const getOutputs = async () => {
			const tweetRefs = await db.collection('tweets').orderBy('updateTime', 'desc').get()
			const tweetList = tweetRefs.docs.map(querySnapshot => {
				return { ref: querySnapshot.ref, ...querySnapshot.data() }
			})
			const userRefs = await db.collection('users').get()
			const userList = userRefs.docs.map(querySnapshot => {
				return { mainId: querySnapshot.id, ...querySnapshot.data() }
			})
			const bookRefs = await db.collection('books').get()
			const bookList = bookRefs.docs.map(querySnapshot => {
				return { mainId: querySnapshot.id, ...querySnapshot.data() }
			})
			const outputs = tweetList.map(tweet => {
				const user = userList.filter(user => user.mainId == tweet.userRef.id)[0]
				const book = bookList.filter(book => book.mainId == tweet.bookRef.id)[0]
				return { user, tweet, book }
			})
			setOutputs(outputs)
		}
		getOutputs()
	}, [])

	if (!currentUser) {
		return <></>
	}

	return (
		<main className={styles.main}>
			<div className={styles.title__container}>
				<h1 className={styles.title}>みんなのアウトプット</h1>
			</div>
			<div className={styles.contents__container}>
				{outputs.map((output, i) => (
					<div key={i} className={styles.content__output}>
						{/* User */}
						{output.user && output.tweet && (
							<div className={styles.user__container}>
								{output.user && (
									<Link href={`/users/${output.user.id}`}>
										<div className={styles.user__image__area}>
											<Image src={output.user.photoURL} width={50} height={50} alt="user photo" className={styles.user__image} />
										</div>
									</Link>
								)}
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
						)}
						{/* Book */}
						{output.book && (
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
						)}
						{/* Button */}
						<div className={styles.btn__container}>
							<LikeButton tweetRef={output.tweet.ref} />
						</div>
					</div>
				))}
			</div>
		</main>
	)
}

Home.getLayout = page => <Layout>{page}</Layout>

export default Home
