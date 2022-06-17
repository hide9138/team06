import { useRouter } from "next/router"
import { useAuth } from "../components/AuthContext";

export default function Login() {
    const router = useRouter();
    const { currentUser, logout, login } = useAuth()

    const handleLoginButton = () => {
        login();
        router.push('/homepage')
      }

    const handleLogoutButton = () => {
        logout()
    }

    return (
        <div>
            <h1>Home</h1>
            {currentUser && 
                <div>
                    <h2>ログインしています.</h2>
                    <h2>{currentUser.displayName}</h2>
                    <button onClick={() => router.push('/homepage')}>
                    Homeへ
                    </button>
                    <button onClick={handleLogoutButton}>ログアウト</button>
                </div>
            }
            {!currentUser &&
                <div>
                    <h2>会員登録</h2>
                    <button onClick={handleLoginButton}>
                    Googleアカウントで認証
                    </button>
                </div>
            }
        </div>
      );

}