import '@/styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <UserProvider>
      {getLayout(
        <Component {...pageProps} />
      )}
    </UserProvider>
  )
}
