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
import { useRouter } from 'next/router'

const UserProfile = ({ user }) => {
	return (
		<div className={styles.user__profile__container}>
			<div className={styles.user__profile__info__container}>
				<div className={styles.user__profile__info__block}>
					<Image src={user.photoURL} width={90} height={90} alt="user photo" className={styles.user__image} />
					<div className={styles.user__profile__info}>
						<h4 className={styles.user__display__name}>{user.displayName}</h4>
						<p className={styles.username}>@{user.id.slice(0, 5)}</p>
					</div>
				</div>
				<p className={styles.user__profile__info__text}>{user.selfIntroduction}</p>
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
		<div className={styles.contents__container}>
			{outputs.map((output, i) => (
				<OutputCard key={i} output={output} />
			))}
		</div>
	)
}

const Likes = ({ likes }) => {
	return (
		<div className={styles.contents__container}>
			{likes.map((output, i) => (
				<OutputCard key={i} output={output} />
			))}
		</div>
	)
}

const Home = () => {
	const tabId = Number(useRouter().query.tab)
	let userId = useRouter().query.id
	const { currentUser } = useAuth()
	userId = userId == 'mypage' && currentUser ? currentUser.uid : userId

	const [tabIndex, setTabIndex] = useState(tabId || 0)
	const [outputs, setOutputs] = useState([])
	const [books, setBooks] = useState([])
	const [likes, setLikes] = useState([])
	const [user, setUser] = useState([])

	const userRef = db.collection('users').doc(userId)

	useEffect(() => {
		const getOutputs = async () => {
			const tweetRefs = await db.collection('tweets').where('userRef', '==', userRef).orderBy('updateTime', 'desc').get()
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
				const book = bookList.filter(book => book.mainId == tweet.bookRef.id)[0]
				const user = userList.filter(user => user.mainId == tweet.userRef.id)[0]
				return { user, tweet, book }
			})

			const booksData = bookList.filter(book => String(book.userRef.id) === String(userRef.id))
			setBooks(booksData)
			setOutputs(outputs)

			//いいねした一覧データ取得
			const likeRefs = await db.collection('likes').where('userRef', '==', userRef).get()
			const likeList = likeRefs.docs.map(querySnapshot => querySnapshot.data())
			const tweetLikeRefs = await db.collection('tweets').orderBy('updateTime', 'desc').get()
			let tweetLikeList = tweetLikeRefs.docs.map(querySnapshot => {
				return { mainId: querySnapshot.id, ref: querySnapshot.ref, ...querySnapshot.data() }
			})

			tweetLikeList = tweetLikeList.filter(tweet => likeList.some(like => tweet.mainId === like.tweetRef.id))

			const likes = tweetLikeList.map(tweet => {
				const book = bookList.filter(book => book.mainId == tweet.bookRef.id)[0]
				const user = userList.filter(user => user.mainId == tweet.userRef.id)[0]
				return { user, tweet, book }
			})
			setLikes(likes)
		}
		const getUser = async () => {
			const userSnapshot = await userRef.get()
			setUser({ id: userSnapshot.id, ...userSnapshot.data() })
		}
		if (currentUser) {
			getOutputs()
			getUser()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className={styles.main}>
			{user.id && <UserProfile user={user} />}

			{/* Tab */}
			<div className={styles.tabs}>
				{['本棚', 'アウトプット', 'いいね'].map((lable, i) => (
					<button key={i} onClick={() => setTabIndex(i)} className={`${styles.tab} ${tabIndex === i && styles.active__tab}`}>
						{lable}
					</button>
				))}
			</div>

			{/* Tab contents */}
			{tabIndex === 0 && <BookShelf books={books} />}
			{tabIndex === 1 && <Outputs outputs={outputs} />}
			{tabIndex === 2 && <Likes likes={likes} />}
		</main>
	)
}
Home.getLayout = page => <Layout>{page}</Layout>

export default Home
