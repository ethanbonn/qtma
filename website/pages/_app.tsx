import '../styles/globals.css'
import type { AppProps } from 'next/app'
import initAuth from '../logic/initAuth'

initAuth()

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
