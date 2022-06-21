import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'

export default function Home() {
	const { id } = useRouter().query
	return (
		<main className={styles.main}>
			<h1 className={styles.title}>books show</h1>
			<h1 className={styles.title}>id: {id}</h1>
		</main>
	)
}
