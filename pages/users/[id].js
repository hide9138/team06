import React, { useState, useEffect } from 'react'
import BookShelf from '../../components/bookShelf'
import Image from 'next/image'
import styles from '../../styles/users/Home.module.css'
import { useUser } from '../../components/UserContext'
import OutputCard from '../../components/outputCard'
import Layout from '../../components/layout'
import EditProfileModal from '../../components/editProfileModal'
import { db } from '../../firebase/firebase'
import { useAuth } from '../../components/AuthContext'

const UserProfile = () => {
	const { id, displayName, selfIntroduction, photoURL } = useUser()
	if (!id) return null

	return (
		<div className={styles.user__profile__container}>
			<div className={styles.user__profile__info__container}>
				<div className={styles.user__profile__info__block}>
					<Image src={photoURL} width={90} height={90} alt="user photo" className={styles.user__image} />
					<div className={styles.user__profile__info}>
						<h4 className={styles.user__display__name}>{displayName}</h4>
						<p className={styles.username}>@{id.slice(0, 5)}</p>
					</div>
				</div>
				<p className={styles.user__profile__info__text}>{selfIntroduction}</p>
				<div className={styles.user__relations}>
					<p className={styles.user__profile__info__text}>
						フォロー <span className={styles.cnt}>100</span>
					</p>
					<p className={styles.user__profile__info__text}>
						フォロワー <span className={styles.cnt}>100</span>
					</p>
				</div>
			</div>
			{/* プロフィール編集用モーダル */}
			<EditProfileModal />
		</div>
	)
}

const Outputs = ({ outputs }) => {
	return (
		<>
			<div className={styles.contents__container}>
				{outputs.map((output, i) => (
					<OutputCard key={i} output={output} />
				))}
			</div>
		</>
	)
}

const Home = () => {
	const [tabIndex, setTabIndex] = useState(0)
	const [outputs, setOutputs] = useState([])
	const [books, setBooks] = useState([])
	const { currentUser } = useAuth()

	useEffect(() => {
		const getOutputs = async () => {
			const userRef = db.collection('users').doc(currentUser.uid)
			const tweetRefs = await db.collection('tweets').where('userRef', '==', userRef).orderBy('updateTime', 'desc').get()
			const tweetList = tweetRefs.docs.map(querySnapshot => querySnapshot.data())
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

			const booksData = bookList.filter(book => String(book.userRef.id) === String(userRef.id))
			setBooks(booksData)
			setOutputs(outputs)
		}
		if (currentUser) getOutputs()
	}, [])

	return (
		<main className={styles.main}>
			<UserProfile />

			{/* Tab */}
			<div className={styles.tabs}>
				{['本棚', 'アウトプット', 'いいね'].map((lable, i) => (
					<button key={i} onClick={() => setTabIndex(i)} className={`${styles.tab} ${tabIndex === i && styles.active__tab}`}>
						{lable}
					</button>
				))}
			</div>

			{/* Tab contents */}
			{tabIndex == 0 && <BookShelf books={books} />}
			{tabIndex == 1 && <Outputs outputs={outputs} />}
			{tabIndex == 2 && <Outputs outputs={outputs} />}
		</main>
	)
}
Home.getLayout = page => <Layout>{page}</Layout>

export default Home
