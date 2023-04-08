import Head from 'next/head'
import Navigation from '@/components/Navigation'
import Drawer from '@/components/Drawer';
import Layout from '@/components/Layout';
import withAuth from '@/middlewares/auth';

export async function getServerSideProps(context) {
  return withAuth(
    async ({ user }) => {
      return {
        props: { user: user || null },
      };
    },
    false, false
  )(context.req, context.res);
}


export default function Home() {
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


Home.getLayout = function getLayout(page) {
  return <Layout user={page.props.user}> {page}</Layout>
}