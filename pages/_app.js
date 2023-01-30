import dynamic from 'next/dynamic'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import '../styles/globals.scss'

const Store = dynamic(() => import('../context/Store'), { ssr: false })

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Component {...pageProps} />
      <div id='modal' />
      <ToastContainer position='bottom-right' />
    </Store>
  )
}

export default MyApp
