import { useRouter } from 'next/router';
import { useAuth } from "../components/AuthContext";

export default function Home() {
    const { currentUser, logout } = useAuth()
    const router = useRouter();

    const handleLogoutButton = () => {
        logout();
        router.push('/login')
    }

    return (
        <div>
        <h1>Team06</h1>
        {currentUser && 
        <div>
            <h2>ログインしています.</h2>
            <h2>{currentUser.displayName}</h2>
            <button onClick={handleLogoutButton}>ログアウト</button>
        </div>
        }
        {!currentUser &&
        <div>
            <h2>ログインされていません</h2>
            <button onClick={() => router.push('/login')}>ログイン画面へ</button>
        </div>}
        </div>
    )
}