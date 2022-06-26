import { createContext, useContext, useEffect, useState } from 'react'
import firebase, { auth, db } from '../firebase/firebase'

const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

const UserProvider = ({ children }) => {
  const [id, setId] = useState(null)
  const [photoURL, setPhotoURL] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [selfIntroduction, setSelfIntroduction] = useState(null)

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (!user) return
      const getUser = async () => {
        const userRef = db.collection('users').doc(user.uid)
        let userDoc = await userRef.get()
        if (!userDoc.exists) {
          await userRef.set({
            id: user.uid,
            displayName: user.displayName,
            selfIntroduction: "",
            email: user.email,
            photoURL: user.photoURL,
            createTime: firebase.firestore.FieldValue.serverTimestamp(),
            updateTime: firebase.firestore.FieldValue.serverTimestamp(),
          })
        }
        userDoc = await userRef.get()
        setId(userDoc.id)
        setDisplayName(userDoc.data().displayName)
        setSelfIntroduction(userDoc.data().selfIntroduction)
        setPhotoURL(userDoc.data().photoURL)
      }
      getUser()
    })
  }, [])

  const value = {
    id, displayName, selfIntroduction, photoURL,
    setId, setDisplayName, setSelfIntroduction, setPhotoURL
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
