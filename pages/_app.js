import '../styles/globals.css'
import AuthProvider from '../components/AuthContext'

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || (page => page)
	return <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
}

export default MyApp
