import dynamic from 'next/dynamic'
import '../styles/globals.css'

const Store = dynamic(() => import('../context/Store'), { ssr: false })

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Component {...pageProps} />
      <div id='modal' />
    </Store>
  )
}

export default MyApp
