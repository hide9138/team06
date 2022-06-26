import React, { useState } from 'react'
import { useRouter } from 'next/router'
import BookShelf from '../../components/bookShelf'
import Image from 'next/image'
import styles from '../../styles/users/Home.module.css'
import Sidebar from '../../components/sidebar'
import BookSearch from '../../components/bookSearch'
import { useAuth } from '../../components/AuthContext'

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

const UserProfile = ({ currentUser }) => {
  return (
    <div className={styles.user__profile__container}>
      <div className={styles.user__profile__info__container}>
        <div className={styles.user__profile__info__block}>
          <Image src={currentUser.photoURL} width={90} height={90} alt="user photo" className={styles.user__image} />
          <div className={styles.user__profile__info}>
            <h4 className={styles.user__display__name}>{currentUser.displayName}</h4>
            <p className={styles.username}>@{currentUser.uid.slice(0, 5)}</p>
          </div>
        </div>
        <p className={styles.user__profile__info__text}>好きな本はうんこまんです</p>
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

const OutputCard = ({ output }) => {
  return (
    <div className={styles.content__output}>
      {/* User */}
      <div className={styles.user__container}>
        <div className={styles.user__image__area}>
          <Image src={output.userPhotoUrl} width={50} height={50} alt="user photo" className={styles.user__image} />
        </div>
        <div className={styles.user__info}>
          <p className={styles.user__name}>{output.userName}</p>
          <p className={styles.output__words}>
            <span>P. {output.page}</span>
            <span>{` ｢${output.word1}｣`}</span>
            <span>{` ｢${output.word2}｣`}</span>
            <span>{` ｢${output.word3}｣`}</span>
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

      <div className={styles.btn__group}>
        <button type="button" className={styles.btn__crud}>編集</button>
        <button type="button" className={styles.btn__crud}>削除</button>
      </div>

      {/* Button */}
      <div className={styles.btn__container}>
        <div className={styles.btn}>
          <Image src="https://static.overlay-tech.com/assets/dea603c0-b98a-4f6f-89ff-861082b18421.svg" width="16" height="16" alt="like" />
          <p className={styles.count}>6</p>
        </div>
      </div>
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
  const { id } = useRouter().query
  const { currentUser } = useAuth()

  const [tabIndex, setTabIndex] = useState(0)

  if (!currentUser) {
    return <></>
  }


  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <Sidebar />
      {/* Main */}
      <main className={styles.main}>
        <UserProfile currentUser={currentUser} />

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
      {/* Book Search Area */}
      <BookSearch />
    </div>
  )
}

export default Home;

