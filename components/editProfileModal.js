import styles from '../styles/components/editProfileModal.module.css';
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Modal from './modal';


const EditProfileModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const inputFileRef = useRef(null)

  const [name, setName] = useState("伊藤マイケル");
  const [introduction, setIntroduction] = useState("好きな本はうんこまんです")

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleUpdateImage = () => {
    // File 選択
    inputFileRef.current.click()
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // ここに　Firebase にデータを送信する関数を入れる
    // ex
    // await updateUserProfile();

    handleClose();
    console.log("update user information")
  }

  const Content = ({ handleSubmit }) => {
    return (
      <form className={styles.form__container}>
        <div className={styles.input__image__container}>
          <button type="button" onClick={handleUpdateImage} className={styles.input__image__button}>
            <Image src="https://static.overlay-tech.com/assets/3d3c257d-25ef-46ac-8f50-17b6d4792414.png" width={200} height={200} alt="user image" className={styles.user__image} />
          </button>
          <input className={styles.input__file} ref={inputFileRef} type="file" name="imgae" id="image" />
        </div>
        <div className={styles.input__container}>
          <label className={styles.input__label} htmlFor="username">名前</label>
          <input className={styles.input} type="text" name="username" id="username" defaultValue={name} onClick={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.input__container}>
          <label className={styles.input__label} htmlFor="introduction">自己紹介</label>
          <textarea className={styles.textarea} type="text" name="introduction" id="introduction" defaultValue={introduction} onClick={(e) => setIntroduction(e.target.value)} />
        </div>
        <button type='submit' className={styles.close__button} onClick={handleSubmit}>x</button>
      </form>
    )
  }

  return (
    <div>
      <button className={styles.edit__button} onClick={() => setIsOpen(true)}>
        プロフィール編集
      </button>

      <Modal isOpen={isOpen} handleClose={handleClose} content={Content({ handleSubmit })} />
    </div>
  )
}

export default EditProfileModal
