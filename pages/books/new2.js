import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import { useAuth } from '../../components/AuthContext'
import firebase, { auth, db } from '../../firebase/firebase'
import Image from 'next/image'

const book = {
	bookDetailId: 'LCIbnwEACAAJ',
	pageCount: 123,
	word1: '1',
	word2: '2',
	word3: '3',
}

export default function New2() {
	const { currentUser } = useAuth()
	console.log(currentUser)

	const onClickCreateBook = async props => {
		const userRef = db.collection('users').doc(currentUser.uid)
		const book = props.book
		db.collection('books')
			.add({
				bookDetailId: book.bookDetailId,
				pageCount: book.pageCount,
				word1: book.word1,
				word2: book.word2,
				word3: book.word3,
				userRef: userRef,
				createTime: firebase.firestore.FieldValue.serverTimestamp(),
				updateTime: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.then(() => {
				console.log('Document successfully written!')
			})
			.catch(error => {
				console.log(error)
			})
	}

	return (
		<main className={styles.main}>
			<h1 className={styles.title}>books new2</h1>
			<div key={currentUser.id}>
				<div>
					<Image src={currentUser.photoURL} alt="Picture" width={50} height={50} />
					{currentUser.displayName}
				</div>
				<div>{currentUser.email}</div>
				<div>{currentUser.likeBookCount}</div>
				<button onClick={() => onClickCreateBook({ book, currentUser })}>本の新規作成</button>
			</div>
		</main>
	)
}
