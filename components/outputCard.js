import React from 'react'
import Image from 'next/image'
import styles from '../styles/components/outputCard.module.css'

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

export default OutputCard