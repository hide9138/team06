import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'

export default function Home() {
	return (
		<main className={styles.main}>
			<h1 className={styles.title}>users index</h1>
		</main>
	)
}
