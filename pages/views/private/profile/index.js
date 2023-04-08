import React from "react";
import Layout from "@/components/Layout";
import withAuth from "@/middlewares/auth";
import NotVerifiedProfile from "@/components/profile/NotVerifiedProfile";
import VerifiedProfile from '@/components/profile/VerifiedProfile';

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
export default function Profile({ user }) {
  return (
    <>
      {user.isEmailVerified ? <VerifiedProfile user={user} /> : <NotVerifiedProfile user={user} />}
    </>
  )
}

Profile.getLayout = function getLayout(page) {
  return <Layout user={page.props.user}> {page}</Layout>
}