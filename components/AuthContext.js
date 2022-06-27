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

		return auth.signInWithRedirect(provider)
		// .signInWithPopup(provider)
	}
	const createUser = () => {
		return auth
			.getRedirectResult()
			.then(result => {
				const user = result.user
				const userRef = db.collection('users').doc(user.uid)
				console.log(user)
				userRef.set({
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					createTime: firebase.firestore.FieldValue.serverTimestamp(),
					updateTime: firebase.firestore.FieldValue.serverTimestamp(),
				})
			})
			.catch(error => {
				console.log(error)
			})
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
		createUser,
	}

	return <AuthContext.Provider value={value}>{loading ? <p>loading...</p> : children}</AuthContext.Provider>
}

export default AuthProvider
