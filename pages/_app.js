import '../styles/globals.css'
import Head from 'next/head'
import { AuthStateProvider } from '../global-contexts/auth-state';

function MyApp({ Component, pageProps }) {
  return <AuthStateProvider>

    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </AuthStateProvider>
}

export default MyApp
