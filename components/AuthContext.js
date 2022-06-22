import { createContext, useContext, useEffect, useState } from 'react'
import firebase, { auth, db } from '../firebase/firebase'

const AuthContext = createContext()

export const useAuth = () => {
	return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const login = () => {
		const provider = new firebase.auth.GoogleAuthProvider()
		auth
			.signInWithPopup(provider)
			.then(result => {
				const user = result.user
				const userRef = db.collection('users').doc(user.uid)
				userRef.set({
					name: user.displayName,
					photoURL: user.photoURL,
					email: user.email,
					likePostCount: 0,
					createTime: firebase.firestore.FieldValue.serverTimestamp(),
					updateTime: firebase.firestore.FieldValue.serverTimestamp(),
				})
			})
			.catch(error => {
				console.log(error)
			})

		return
	}

	const logout = () => {
		return auth.signOut()
	}

	useEffect(() => {
		return auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})
	}, [])

	const value = {
		currentUser,
		login,
		logout,
	}

	return <AuthContext.Provider value={value}>{loading ? <p>loading...</p> : children}</AuthContext.Provider>
}

export default AuthProvider
