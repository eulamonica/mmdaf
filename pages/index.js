import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0/client';
import Navigation from '@/components/Navigation'
import Drawer from '@/components/Drawer';
export default function Home() {
  const { user, error, isLoading } = useUser();

  return (
    <>
      <Head>
        <title>MMDA Forecasting</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Drawer>
          <Navigation />
        </Drawer>
      </main>
    </>
  )
}
