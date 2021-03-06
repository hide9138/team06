import { useRouter } from 'next/router'
import { useAuth } from '../components/AuthContext'

export default function Login() {
	const router = useRouter()
	const { currentUser, createUser, logout, login, login_demo } = useAuth()

	const handleLoginButton = async () => {
		router.push(`users/mypage`)
		await login()
		createUser()
	}

	const handleLoginDemoButton = async () => {
		router.push(`users/mypage`)
		await login_demo()
	}

	const handleLogoutButton = () => {
		logout()
	}

	return (
		<div>
			<h1>Home</h1>
			{currentUser && (
				<div>
					<h2>ログインしています.</h2>
					<h2>{currentUser.displayName}</h2>
					<button onClick={() => router.push(`users/mypage`)}>Homeへ</button>
					<button onClick={handleLogoutButton}>ログアウト</button>
				</div>
			)}
			{!currentUser && (
				<div>
					<h2>会員登録</h2>
					<button onClick={handleLoginButton}>Googleアカウントで認証</button>
					<button onClick={handleLoginDemoButton}>デモアカウントでログイン</button>
				</div>
			)}
		</div>
	)
}
