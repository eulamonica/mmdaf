import React from "react";
import Layout from "@/components/Layout";
import withAuth from '@/middlewares/auth';

export async function getServerSideProps(context) {
  return withAuth(
    async ({ user }) => {
      return {
        props: { user: user || null },
      };
    },
    true, true
  )(context.req, context.res);
}

export default function Dashboard({ user }) {
  return (
    <h1> Dashboard </h1>
  )
}


Dashboard.getLayout = function getLayout(page) {
  return <Layout user={page.props.user}> {page}</Layout>

}

