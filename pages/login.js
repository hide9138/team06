import { useAuth } from "../components/AuthContext";

export default function Home() {
  const { currentUser, login, logout } = useAuth()

  const handleLoginButton = () => {
    login()
  }

  const handleLogoutButton = () => {
    logout()
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
        <h2>会員登録</h2>
        <button onClick={handleLoginButton}>会員登録</button>
      </div>}
    </div>
  )
}