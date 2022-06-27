import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../../styles/Homepage.module.css'
import { useAuth } from '../../components/AuthContext'
import Layout from '../../components/layout'
import firebase, { db } from '../../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'

const output = {
	userPhotoUrl: 'https://static.overlay-tech.com/assets/3d3c257d-25ef-46ac-8f50-17b6d4792414.png',
	userName: '伊藤マイケル',
	page: 24,
	threeWords: ['失敗', '貴重な学び', '成功の可能性'],
	bookPhotoUrl: 'https://static.overlay-tech.com/assets/8fcdb0ac-9c3a-436c-883e-6249e0f97503.png',
	bookTitle: '本のタイトル',
	bookAuthor: '',
}

const outputss = new Array(5).fill(output)

const Home = () => {
	const { currentUser } = useAuth()
	const [tweets, setTweets] = useState([])
	const [users, setUsers] = useState([])

	useEffect(() => {
		const getOutputs = async () => {
			// const getUser = async userRef => {
			// 	const userDoc = await userRef.get()
			// 	const user = await userDoc.data()
			// 	console.log(user)
			// 	await setUsers([...users, user])
			// }
			const tweetRefs = await db.collection('tweets').get()
			const tweetData = await tweetRefs.docs.map(querySnapshot => querySnapshot.data())
			setTweets(tweetData)

			// tweetData.forEach(tweet => getUser(tweet.userRef))
			tweetData.forEach(tweet => tweet.userRef.get().then(doc => setUsers([...users, doc.data()])))
		}
		getOutputs()
	}, [])

	if (!currentUser) {
		return <></>
	}
	console.log(users)
	// console.log(tweets)
	return (
		<main className={styles.main}>
			<div className={styles.title__container}>
				<h1 className={styles.title}>みんなのアウトプット</h1>
			</div>
			<div className={styles.contents__container}>
				{outputss.map((output, i) => (
					<div key={i} className={styles.content__output}>
						{/* User */}
						<div className={styles.user__container}>
							<div className={styles.user__image__area}>
								<Image src={output.userPhotoUrl} width={50} height={50} alt="user photo" className={styles.user__image} />
							</div>
							<div className={styles.user__info}>
								<p className={styles.user__name}>{output.userName}</p>
								<p className={styles.output__words}>
									<span>P. {output.page}</span>
									{output.threeWords.map(word => (
										<span key={`${i}-${word}`}>{`「${word}」`}</span>
									))}
								</p>
							</div>
						</div>
						{/* Book */}
						<div className={styles.book__container}>
							<div className={styles.book__image__area}>
								<Image src={output.bookPhotoUrl} width={72} height={100} alt="user photo" className={styles.book__image} />
							</div>
							<div className={styles.book__info}>
								<p>{output.bookTitle}</p>
								<p>著者名：{output.bookAuthor}</p>
							</div>
						</div>
						{/* Button */}
						<div className={styles.btn__container}>
							<div className={styles.btn}>
								<Image
									src="https://static.overlay-tech.com/assets/dea603c0-b98a-4f6f-89ff-861082b18421.svg"
									width="16"
									height="16"
									alt="like"
								/>
								<p className={styles.count}>6</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</main>
	)
}

Home.getLayout = page => <Layout>{page}</Layout>

export default Home
