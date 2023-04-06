import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <>
      {
        getLayout(<Component {...pageProps} />)
      }
      <ToastContainer />
    </>
  )
}
