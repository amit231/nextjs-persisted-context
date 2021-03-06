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
    <style jsx global>{`
				*{
					margin:0;
					padding:0;
				}
				:root{
					--main-color:red;
				}
        html {
          scroll-behavior: smooth;
					font-size:10px;
					margin:0;
					padding:0;
					font-family:Poppins;
        }
        ::-webkit-scrollbar {
          height: 6px;
          width: 8px;
          background: #141414;
          border-radius: 20px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          border-radius: 20px;
          box-shadow: inset 0 0 2px grey;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: white;
          border-radius: 20px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #2f0e40;
        }
      `}</style>
    <Component {...pageProps} />
  </AuthStateProvider>
}

export default MyApp
