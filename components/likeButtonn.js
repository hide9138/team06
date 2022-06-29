import React, { useState, useEffect } from 'react'
import styles from '../styles/Homepage.module.css'
import { useAuth } from '../components/AuthContext'
import { db } from '../firebase/firebase'

const LikeButton = ({ bookRef }) => {
	const [isLike, setIsLike] = useState(false)
	const [likeCount, setLikeCount] = useState()
	const { currentUser } = useAuth()

	const userRef = db.collection('users').doc(currentUser.uid)
	useEffect(() => {
		countLike()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const countLike = async () => {
		const querySnapshot = await db.collection('likes').where('bookRef', '==', bookRef).get()
		const count = querySnapshot.docs.length
		setLikeCount(count)
		console.log(count)

		if (count !== 0) {
			const isLike = querySnapshot.docs.some(doc => doc.data().userRef.id == userRef.id)
			setIsLike(isLike)
		} else {
			setIsLike(false)
		}
	}

	const handleClick = async () => {
		const likeRefs = await db.collection('likes').where('bookRef', '==', bookRef).where('userRef', '==', userRef).get()
		if (likeRefs.docs.length === 0) {
			db.collection('likes').add({
				userRef: userRef,
				bookRef: bookRef,
			})
		} else {
			likeRefs.docs[0].ref.delete()
		}
		countLike()
	}

	return (
		<span className={styles.btn} onClick={() => handleClick(bookRef)}>
			{isLike ? '♥' : '♡'} <span className={styles.count}>{likeCount}</span>
		</span>
	)
}

export default LikeButton
