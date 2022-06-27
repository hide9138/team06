import Sidebar from "./sidebar"
import BookSearchbar from "./bookSearch"
import UserProvider from "./UserContext"
import styles from '../styles/components/layout.module.css'

const Layout = ({ children }) => (
  <UserProvider>
    <div className={styles.container}>
      <Sidebar />
      {children}
      <BookSearchbar />
    </div>
  </UserProvider>
)

export default Layout