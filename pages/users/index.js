import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import { db } from '../../firebase/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

import Image from 'next/image'

export default function Index() {
	const [users, setUsers] = useState([])

	useEffect(() => {
		const usersCollectionRef = collection(db, 'users')
		onSnapshot(usersCollectionRef, snapshot => {
			let results = []
			snapshot.docs.forEach(doc => {
				results.push({ ...doc.data(), id: doc.id })
			})
			setUsers(results)
		})
		return
	}, [])

	return (
		<main className={styles.main}>
			<h1 className={styles.title}>users index</h1>
			<h1>
				{users.map(user => (
					<div key={user.id}>
						<div>
							<Image src={user.photoURL} alt="Picture" width={50} height={50} />
							{user.displayName}
						</div>
						<div>{user.email}</div>
						<div>{user.likeBookCount}</div>
					</div>
				))}
			</h1>
		</main>
	)
}
