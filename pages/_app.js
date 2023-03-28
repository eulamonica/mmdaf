import { UserProvider } from '@auth0/nextjs-auth0/client';
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
