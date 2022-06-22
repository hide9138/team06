import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyBsT2eipLuMQPw_Fjzd5jzwfGMbpjRnHL8',
	authDomain: 'team06-879b7.firebaseapp.com',
	projectId: 'team06-879b7',
	storageBucket: 'team06-879b7.appspot.com',
	messagingSenderId: '500843110114',
	appId: '1:500843110114:web:1ed6aafa4616bcabcbc8bb',
	measurementId: 'G-MLB3DT7QD9',
}
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

export default firebase
export const auth = firebase.auth()
export const db = firebase.firestore()
