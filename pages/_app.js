import Head from 'next/head'
import dynamic from 'next/dynamic'
import 'react-toastify/dist/ReactToastify.css'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import '../styles/globals.scss'

const Store = dynamic(() => import('../context/Store'), { ssr: false })

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta
          property='og:image:url'
          content='https://cleanbreak.vercel.app/images/preview.jpg'
        />

        <meta property='og:image:width' content='1200px' />
        <meta property='og:image:height' content='630px' />
        <meta property='og:title' content='CLEAN BREAK' />
        <meta
          property='og:description'
          content='A drum machine for the browser.'
        />
        <meta property='og:url' content='https://cleanbreak.vercel.app' />
        <meta property='og:type' content='website' />

        <meta charSet='utf-8' />
        <link rel='shortcut icon' href='/images/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />

        <link rel='apple-touch-icon' href='/images/logo192.png' />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://cleanbreak.vercel.app' />
        <meta property='twitter:title' content='CLEAN BREAK' />
        <meta
          property='twitter:description'
          content='A drum machine for the browser.'
        />
        <meta
          property='twitter:image'
          content='https://cleanbreak.vercel.app/images/preview.jpg'
        />

        <title>CLEAN BREAK</title>
        <meta name='title' content='CLEAN BREAK' />
        <meta name='description' content='A drum machine for the browser.' />
      </Head>
      <Store>
        <Component {...pageProps} />
        <div id='modal' />
        <ToastContainer position='bottom-right' />
      </Store>
    </SessionProvider>
  )
}

export default MyApp
