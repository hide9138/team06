import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from './AuthContext'
import { useRouter } from 'next/router'
import styles from '../styles/components/sidebar.module.css'
import { useUser } from './UserContext'

const MenuList = ({ href, iconPath, text, currentPath }) => {
  return (
    <div className={styles.nav__menu__item}>
      {/* Nav menu */}
      <Link href={href}>
        <a className={`${styles.nav__menu__link} ${href.includes(currentPath) && styles.nav__menu__link__active}`}>
          <div className={styles.nav__menu__image__container}>
            <Image src={iconPath} width="30" height="30" alt="icon" className={`${href.split('/')[1] === 'users' && styles.nav__menu__photo}`} />
          </div>
          <span className={styles.nav__menu__text}>{text}</span>
        </a>
      </Link>
    </div>
  )
}

const SideBar = () => {
  const { logout } = useAuth()
  const { id, photoURL } = useUser()

  const router = useRouter()

  if (!id) {
    return <></>
  }

  const { asPath } = router
  const currentPath = asPath.split('/')[1]

  const handleLogoutButton = () => {
    logout()
    router.push('/')
  }

  const handleOutput = () => {
    router.push('/books/new1')
  }

  const links = [
    { href: '/books/', iconPath: 'https://static.overlay-tech.com/assets/c5fee165-810f-4657-a7f5-0c8b69b98c1a.svg', text: 'ホーム' },
    { href: '/message', iconPath: 'https://static.overlay-tech.com/assets/d704290d-0dc2-4c92-88c9-f094852e5678.svg', text: 'メッセージ' },
    { href: `/users/${id}`, iconPath: `${photoURL}`, text: 'プロフィール' },
  ]

  return (
    <div className={styles.sidebar}>
      {/* Nav Area */}
      <nav className={styles.nav__menu}>
        {/* Nav icons */}
        {links.map(link => (
          <MenuList key={link.href} href={link.href} iconPath={link.iconPath} text={link.text} currentPath={currentPath} />
        ))}
      </nav>

      {/* Button Area */}
      <div className={styles.btn__container}>
        <button className={styles.btn__output} onClick={handleOutput}>
          アウトプットする
        </button>
      </div>

      <div className={styles.btn__container}>
        <button className={styles.btn__logout} onClick={handleLogoutButton}>ログアウト</button>
      </div>
    </div>
  )
}

export default SideBar;