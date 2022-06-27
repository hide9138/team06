import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Homepage.module.css'
import { useAuth } from '../../components/AuthContext'
import Layout from '../../components/layout'

import { db } from '../../firebase/firebase'
import Link from 'next/link'

const Home = () => {
	const { currentUser } = useAuth()
	const [outputs, setOutputs] = useState([])

	useEffect(() => {
		const getOutputs = async () => {
			const tweetRefs = await db.collection('tweets').orderBy('updateTime', 'desc').get()
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
                <Image src="https://static.overlay-tech.com/assets/dea603c0-b98a-4f6f-89ff-861082b18421.svg" width="16" height="16" alt="like" />
                <p className={styles.count}>6</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home;
