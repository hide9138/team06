import React, { useState } from 'react'
import { useRouter } from 'next/router'
import BookShelf from '../../components/bookShelf'
import Image from 'next/image'
import styles from '../../styles/users/Home.module.css'
import { useUser } from '../../components/UserContext'
import OutputCard from '../../components/outputCard'
import Layout from '../../components/layout'
import EditProfileModal from '../../components/editProfileModal'

const output = {
  userPhotoUrl: 'https://static.overlay-tech.com/assets/3d3c257d-25ef-46ac-8f50-17b6d4792414.png',
  userName: '伊藤マイケル',
  page: 24,
  word1: '失敗',
  word2: '貴重な学び',
  word3: '成功の可能性',
  bookPhotoUrl: 'https://static.overlay-tech.com/assets/8fcdb0ac-9c3a-436c-883e-6249e0f97503.png',
  bookTitle: '本のタイトル',
  bookAuthor: '',
}

const outputs = new Array(5).fill(output);

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

const Outputs = () => {
  return (
    <div className={styles.contents__container}>
      {outputs.map((output, i) => (
        <OutputCard key={i} output={output} />
      ))}
    </div>
  )
}

const contents = [BookShelf, Outputs, Outputs]

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0)

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
      <div className={styles.tab__content__container}>
        {contents[tabIndex]()}
      </div>

    </main>
  )
}

Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home;
