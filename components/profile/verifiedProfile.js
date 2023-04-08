import React from "react";
import Layout from "../Layout";
import withAuth from "@/middlewares/auth";
import UnderConstruction from "../UnderConstruction";

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


export default function VerifiedProfile() {
  return (
    <>
      <UnderConstruction pageName='Profile Page' />
    </>
  )
}

VerifiedProfile.getLayout = function getLayout(page) {
  return <Layout user={page.props.user}> {page}</Layout>

}