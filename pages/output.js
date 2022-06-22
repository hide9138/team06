import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Output.module.css'

const user = {
	photoUrl: 'https://static.overlay-tech.com/assets/3d3c257d-25ef-46ac-8f50-17b6d4792414.png',
	name: '伊藤マイケル',
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
		threeWords: ['失敗', '貴重な学び', '成功の可能性'],
		bookPhotoUrl: book.photoUrl,
		bookTitle: '本のタイトル',
		bookAuthor: '',
	},
	{
		userPhotoUrl: user.photoUrl,
		userName: user.name,
		page: 24,
		threeWords: ['失敗', '貴重な学び', '成功の可能性'],
		bookPhotoUrl: book.photoUrl,
		bookTitle: '本のタイトル',
		bookAuthor: '',
	},
]

const results = [
	{
		photoUrl: 'https://static.overlay-tech.com/assets/bd07130e-33fa-4fcc-8f5f-be741bd81efa.png',
		title: '本のタイトル',
		author: 'うんこまん',
	},
	{
		photoUrl: 'https://static.overlay-tech.com/assets/aad3ed2f-167e-4cf8-b56d-fbdd2d1294a8.png',
		title: '本のタイトル',
		author: 'うんこまん',
	},
]

const links = [
	{ href: '/home', icon: 'https://static.overlay-tech.com/assets/c5fee165-810f-4657-a7f5-0c8b69b98c1a.svg', text: 'ホーム' },
	{ href: '/message', icon: 'https://static.overlay-tech.com/assets/d704290d-0dc2-4c92-88c9-f094852e5678.svg', text: 'メッセージ' },
	{ href: '/bookmark', icon: 'https://static.overlay-tech.com/assets/6b492c36-3113-40a2-91ba-2ae01680d4ab.svg', text: 'ブックマーク' },
	{ href: '/profile', icon: user.photoUrl, text: 'プロフィール' },
]

const MenuList = ({ href, icon, text }) => {
	return (
		<div className={styles.menuItem}>
			<Link href={href}>
				<a className={styles.navLink}>
					{text === 'プロフィール' ? (
						<Image className={styles.userImage} src={icon} width="40" height="40" alt="icon" />
					) : (
						<Image className={styles.navIcon} src={icon} width="30" height="30" alt="icon" />
					)}
					{text === 'ホーム' ? <span className={styles.now}>{text}</span> : <span className={styles.menuText}>{text}</span>}
				</a>
			</Link>
		</div>
	)
}

const LeftSideBar = () => {
	return (
		<div className={styles.leftSideBar}>
			<nav className={styles.navMenu}>
				{links.map(link => (
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
			<div className={styles.userProfile}>
				<div className={styles.userInfoContainer}>
					<div className={styles.userInfoData}>
						<Image src={user.photoUrl} width={100} height={100} alt={user.name} className={styles.userImage} />
						<div className={styles.userInfoBlock}>
							<h4 className={styles.userDisplayName}>{user.name}</h4>
							<p className={styles.username}>@{'mikelIto'}</p>
						</div>
					</div>
					<p className={styles.userInfoText}>好きな本はうんこまんです</p>
					<div className={styles.userRelations}>
						<p className={styles.userInfoText}>
							フォロー <span className={styles.cnt}>100</span>
						</p>
						<p className={styles.userInfoText}>
							フォロワー <span className={styles.cnt}>100</span>
						</p>
					</div>
				</div>
				<button className={styles.editButton}>プロフィール編集</button>
			</div>
			<div className={styles.tabs}>
				<div className={styles.tab}>本棚</div>
				<div className={styles.tabActive}>アウトプット</div>
				<div className={styles.tab}>いいね</div>
			</div>
			<div className={styles.outputsContainer}>
				{outputs.map((output, i) => (
					<div key={i} className={styles.outputCard}>
						<div className={styles.userInfo}>
							<div>
								<Image src={output.userPhotoUrl} width="40" height="40" className={styles.userImage} alt="user photo" />
							</div>
							<div className={styles.userBlock}>
								<p className={styles.userName}>{output.userName}</p>
								<p className={styles.threeWords}>
									<span>P. {output.page}</span>
									{output.threeWords.map(word => (
										<span key={`${i}-${word}`}>{`「${word}」`}</span>
									))}
								</p>
							</div>
						</div>
						<div className={styles.bookInfo}>
							<div className={styles.bookImageArea}>
								<Image className={styles.bookImage} src={output.bookPhotoUrl} width={71} height={102} alt="book photo" />
							</div>
							<div>
								<p>{output.bookTitle}</p>
								<p>著者名：{output.bookAuthor}</p>
							</div>
						</div>
						<div className={styles.actions}>
							<div className={styles.action}>
								<Image
									src="https://static.overlay-tech.com/assets/d328d821-e04d-4473-9460-fa0b70821e51.svg"
									width="16"
									height="16"
									alt="share icon"
								/>
								<p className={styles.actionCounts}>3</p>
							</div>
							<div className={styles.action}>
								<Image
									src="https://static.overlay-tech.com/assets/dea603c0-b98a-4f6f-89ff-861082b18421.svg"
									width="16"
									height="16"
									alt="like icon"
								/>
								<p className={styles.actionCounts}>6</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

const BookCard = ({ book }) => {
	return (
		<div className={styles.bookCard}>
			<div className={styles.bookInfo}>
				<div className={styles.bookImageArea}>
					<Image className={styles.bookImage} src={book.photoUrl} width="135" height="182" alt="book photo" />
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
				{results.map((result, i) => (
					<BookCard key={i} book={result} />
				))}
			</div>
		</div>
	)
}

const Output = () => {
	return (
		<div className={styles.container}>
			<LeftSideBar />
			<Main />
			<RightSideBar />
		</div>
	)
}

export default Output
