import "inter-ui/inter.css";

import '../styles/globals.css'
import '../styles/syntax.scss'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'

function MyApp({ Component, pageProps, router }) {
  const url = `https://lew.digital${router.route}`

  return <div className='font-body text-lg'>

    <Head>
      <title>lew.digital</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={url} canonical={url} />
    </AnimatePresence>
  </div>
}

export default MyApp
