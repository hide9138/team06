import React from 'react';
import Link from 'next/link';
import styles from '../styles/Homepage.module.css';
import { useAuth } from "../components/AuthContext";

const user = {
  photoUrl: 'https://static.overlay-tech.com/assets/3d3c257d-25ef-46ac-8f50-17b6d4792414.png',
  name: '伊藤マイケル'
}

const book = {
  photoUrl: 'https://static.overlay-tech.com/assets/8fcdb0ac-9c3a-436c-883e-6249e0f97503.png',
  title: '本のタイトル',
  author: 'うんこまん',
}

const outputs = [
  {
    userPhotoUrl: user.photoUrl,
    userName: user.name,
    page: 24,
    threeWords: [
      '失敗',
      '貴重な学び',
      '成功の可能性',
    ],
    bookPhotoUrl: book.photoUrl,
    bookTitle: '本のタイトル',
    bookAuthor: ''
  }, {
    userPhotoUrl: user.photoUrl,
    userName: user.name,
    page: 24,
    threeWords: [
      '失敗',
      '貴重な学び',
      '成功の可能性',
    ],
    bookPhotoUrl: book.photoUrl,
    bookTitle: '本のタイトル',
    bookAuthor: ''
  }, {
    userPhotoUrl: user.photoUrl,
    userName: user.name,
    page: 24,
    threeWords: [
      '失敗',
      '貴重な学び',
      '成功の可能性',
    ],
    bookPhotoUrl: book.photoUrl,
    bookTitle: '本のタイトル',
    bookAuthor: ''
  }, {
    userPhotoUrl: user.photoUrl,
    userName: user.name,
    page: 24,
    threeWords: [
      '失敗',
      '貴重な学び',
      '成功の可能性',
    ],
    bookPhotoUrl: book.photoUrl,
    bookTitle: '本のタイトル',
    bookAuthor: ''
  },
]

const results = [
  {
    photoUrl: "https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png",
    title: "本のタイトル",
    author: 'うんこまん'
  },
  {
    photoUrl: "https://static.overlay-tech.com/assets/aad3ed2f-167e-4cf8-b56d-fbdd2d1294a8.png",
    title: "本のタイトル",
    author: 'うんこまん'
  },
]

const links = [
  { href: '/home', icon: 'https://static.overlay-tech.com/assets/6b492c36-3113-40a2-91ba-2ae01680d4ab.svg', text: 'ホーム' },
  { href: '/message', icon: 'https://static.overlay-tech.com/assets/d704290d-0dc2-4c92-88c9-f094852e5678.svg', text: 'メッセージ' },
  { href: '/bookmark', icon: 'https://static.overlay-tech.com/assets/6b492c36-3113-40a2-91ba-2ae01680d4ab.svg', text: 'ブックマーク' },
  { href: '/profile', text: 'プロフィール' },
]

const MenuList = ({ href, icon, text }) => {
  const { currentUser } = useAuth()
  return (
    <div className={styles.menuItem}>
      <Link href={href}>
        <a className={styles.navLink}>
          {text === 'プロフィール' ? (
            <img className={styles.userImage} src={currentUser.photoURL} width="40" height="40" alt="icon" />
          ) : (
            <img className={styles.navIcon} src={icon} width="30" height="30" alt="icon" />
          )}
          {text === 'ホーム' ? (
            <span className={styles.now}>{text}</span>
          ) : (
            <span className={styles.menuText}>{text}</span>
          )}
        </a>
      </Link>
    </div>
  )
}


const LeftSideBar = () => {
  return (
    <div className={styles.leftSideBar}>
      <nav className={styles.navMenu}>
        {links.map((link) => (
          <MenuList key={link.href} href={link.href} icon={link.icon} text={link.text} />
        ))}
      </nav>
      <div className={styles.space} />
      <div className={styles.btnContainer}>
        <button className={styles.outputButton} onClick={() => console.log('output here!')}>
          アウトプットする
        </button>
      </div>
    </div>
  )
}

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          みんなのアウトプット
        </h1>
      </div>
      {outputs.map((output, i) => (
        <div key={i} className={styles.outputCard}>
          <div className={styles.userInfo}>
            <div>
              <img className={styles.userImage} src={output.userPhotoUrl} />
            </div>
            <div>
              <p className={styles.userName}>{output.userName}</p>
              <p className={styles.threeWords}>
                <span>P. {output.page}</span>
                {output.threeWords.map(word => <span key={`${i}-${word}`}>{`「${word}」`}</span>)}
              </p>
            </div>
          </div>
          <div className={styles.bookInfo}>
            <div className={styles.bookImageArea}>
              <img className={styles.bookImage} src={output.bookPhotoUrl} />
            </div>
            <div>
              <p>{output.bookTitle}</p>
              <p>著者名：{output.bookAuthor}</p>
            </div>
          </div>
          <div className={styles.actions}>
            <div className={styles.action}>
              <img src="https://static.overlay-tech.com/assets/d328d821-e04d-4473-9460-fa0b70821e51.svg" width="16" height="16" />
              <p className={styles.actionCounts}>3</p>
            </div>
            <div className={styles.action}>
              <img src="https://static.overlay-tech.com/assets/dea603c0-b98a-4f6f-89ff-861082b18421.svg" width="16" height="16" />
              <p className={styles.actionCounts}>6</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


const BookCard = ({ book }) => {
  return (
    <div className={styles.bookCard}>
      <div className={styles.bookInfo}>
        <div className={styles.bookImageArea}>
          <img className={styles.bookImage} src={book.photoUrl} />
        </div>
        <div className={styles.bookDetails}>
          <p>{book.title}</p>
          <p>著者：{book.author}</p>
        </div>
      </div>
    </div>
  )
}

const RightSideBar = () => {
  return (
    <div className={styles.rightSideBar}>
      <div className={styles.searchBarContainer}>
        {/* Seach Icon Here */}
        <input className={styles.searchBar} type="text" placeholder="本のタイトル、著者名" />
      </div>
      <div>
        <p className={styles.purposeLabel}>本を探す</p>
      </div>
      <div className={styles.searchResults}>
        {results.map((result, i) => <BookCard key={i} book={result} />)}
      </div>
    </div>
  )
}

const HomePage = () => {
  const { currentUser } = useAuth()
  return (
    <div>
    {currentUser &&
      <div className={styles.container}>
        <LeftSideBar />
        <Main />
        <RightSideBar />
      </div>
    }
    </div>
  )
  }

export default HomePage