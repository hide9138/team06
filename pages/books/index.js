import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Homepage.module.css'
import { useAuth } from '../../components/AuthContext'
import Layout from '../../components/layout'
import { createContext, useContext, useEffect, useState } from 'react'
import firebase, { db } from '../../firebase/firebase'
import { useRouter } from 'next/router'

const output = {
  bookRef: '/books/G91h8fkOEUgznkUdZwX7',
  createTime: '2022年6月27日 0:12:16 UTC+9',
  pageNumber: 3,
  updateTime: '2022年6月27日 0:12:16 UTC+9',
  userRef: '/users/xAWf1pI1q9hoqNbtc29Q25tkD0c2',
  word1: "fdさ",
  word2: "あdfs",
  word3: "ファds",
  userPhotoUrl: 'https://static.overlay-tech.com/assets/3d3c257d-25ef-46ac-8f50-17b6d4792414.png',
  bookPhotoUrl: 'https://static.overlay-tech.com/assets/8fcdb0ac-9c3a-436c-883e-6249e0f97503.png',
  bookTitle: '本のタイトル'
}

{/*const output = {
  userPhotoUrl: 'https://static.overlay-tech.com/assets/3d3c257d-25ef-46ac-8f50-17b6d4792414.png',
  userName: '伊藤マイケル',
  page: 24,
  threeWords: ['失敗', '貴重な学び', '成功の可能性'],
  bookPhotoUrl: 'https://static.overlay-tech.com/assets/8fcdb0ac-9c3a-436c-883e-6249e0f97503.png',
  bookTitle: '本のタイトル',
  bookAuthor: '',
  word1: "fdさ",
  word2: "あdfs",
  word3: "ファds",
}*/}

const outputs = new Array(5).fill(output);


const LikeButton = (bookRef) => {
  const [count, setCount] = useState()
  const { currentUser } = useAuth()
  const userRef = db.collection('users').doc(currentUser.uid)
  const querySnapshot = db.collection('likes')
    .where('userRef', '==', userRef)
    .where('bookRef', '==', bookRef)
    .get()
    .then(querySnapshot => {
      const size = querySnapshot.size
      setCount(size)
    })
   
  const handleClick = () => {
    useEffect(() => {
      db.collection('likes').add({
        userRef: userRef,
        bookRef: bookRef
      })
      const querySnapshot = db.collection('likes')
        .where('userRef', '==', userRef)
        .where('bookRef', '==', bookRef)
        .get()
        .then(querySnapshot => {
          const size = querySnapshot.size
          setCount(size)
        })      
    })
  }
  setCount(10)
  const number=10
  return (
  <span className={styles.btn} onClick={handleClick}>
    ♥ {number}
  </span>
  )
}


const Home = () => {
  const [books, setBooks] = useState([])
  const LikeButton = (bookRef) => {
    const [count, setCount] = useState()
    const { currentUser } = useAuth()
    const userRef = db.collection('users').doc(currentUser.uid)
    db.collection('likes')
      .where('userRef', '==', userRef)
      .where('bookRef', '==', bookRef)
      .get()
      .then(querySnapshot => {
        const size = querySnapshot.size
        setCount(size)
      })
    const handleClick = () => {
      db.collection('likes').add({
        userRef: userRef,
        bookRef: bookRef
      })
      const querySnapshot = db.collection('likes')
        .where('userRef', '==', userRef)
        .where('bookRef', '==', bookRef)
        .get()
        .then(querySnapshot => {
          const size = querySnapshot.size
          setCount(size)
        })
    }
    return <span className={styles.btn} onClick={handleClick}>♥ {count}</span>
  }
  

  const { currentUser } = useAuth()

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
                <span>P. {output.page} 「{output.word1}」 「{output.word2}」 「{output.word3}」</span>
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
              <LikeButton bookRef={output.bookRef} />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home;
