import styles from '../styles/components/editProfileModal.module.css';
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Modal from './modal';
import firebase, { db, storage } from '../firebase/firebase'
import { useUser } from './UserContext'
import Spinner from './spinner'

// 型メモ　 currentUser
// type User = {
//   displayName: string
//   email: string
//   createTime: timestamp
//   updateTime: timestamp
//   photoURL: string
// }

const EditProfileModal = () => {
  const [loading, setLoading] = useState(false);

  const displayNameRef = useRef(null)
  const selfIntroductionRef = useRef(null)
  const { id, displayName, setDisplayName, photoURL, setPhotoURL, selfIntroduction, setSelfIntroduction } = useUser()
  // storage　に追加用
  const [selectedFile, setSelectedFile] = useState(null);


  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const inputFileRef = useRef(null)

  const handleUpload = () => {
    // File 選択
    inputFileRef.current.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    const userRef = db.collection('users').doc(id)

    const imageRef = storage.ref().child(`users/${userRef.id}/image`);

    // 画像ファイルが投稿されたとき
    if (selectedFile) {
      await imageRef.putString(selectedFile, 'data_url').then(async () => {
        const downloadURL = await imageRef.getDownloadURL();
        await userRef.set({
          photoURL: downloadURL,
        }, {
          merge: true
        })
        setPhotoURL(downloadURL)
      });
    }

    setDisplayName(displayNameRef.current.value)
    setSelfIntroduction(selfIntroductionRef.current.value)

    await userRef.set({
      displayName: displayNameRef.current.value,
      selfIntroduction: selfIntroductionRef.current.value,
      updateTime: firebase.firestore.FieldValue.serverTimestamp(),
    },
      {
        merge: true
      })

    setSelectedFile(null)
    setLoading(false);

    handleClose();
  }

  // モーダル用
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false)
  }

  // user 認証確認
  if (!id) {
    return <></>
  }

  const Content = ({ handleSubmit }) => {
    return (
      <form className={styles.form__container}>
        <div className={styles.input__image__container}>
          <button type="button" onClick={handleUpload} className={styles.input__image__button}>
            <Image src={selectedFile ? selectedFile : photoURL} width={200} height={200} alt="user image" className={styles.user__image} />
          </button>
          <input className={styles.input__file} ref={inputFileRef} type="file" name="user_photo" id="user photo" onChange={addImageToPost} />
        </div>
        <div className={styles.input__container}>
          <label className={styles.input__label} htmlFor="username">名前</label>
          <input className={styles.input} type="text" name="username" id="username" defaultValue={displayName} ref={displayNameRef} />
        </div>
        <div className={styles.input__container}>
          <label className={styles.input__label} htmlFor="selfIntroduction">自己紹介</label>
          <textarea className={styles.textarea} type="text" name="selfIntroduction" id="selfIntroduction" defaultValue={selfIntroduction} ref={selfIntroductionRef} />
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
      <Spinner loading={loading} />
    </div>
  )
}

export default EditProfileModal
