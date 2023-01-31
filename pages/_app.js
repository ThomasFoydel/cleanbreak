import dynamic from 'next/dynamic'
import 'react-toastify/dist/ReactToastify.css'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import '../styles/globals.scss'

const Store = dynamic(() => import('../context/Store'), { ssr: false })

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Store>
        <Component {...pageProps} />
        <div id='modal' />
        <ToastContainer position='bottom-right' />
      </Store>
    </SessionProvider>
  )
}

export default MyApp
