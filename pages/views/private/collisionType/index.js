import React from "react";
import Layout from "@/components/Layout";
import withAuth from "@/middlewares/auth";
import UnderConstruction from "@/components/UnderConstruction";

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

export default function CollisionType({ user }) {
  return (
    <UnderConstruction pageName='Collision Type Page' />
  )
}

CollisionType.getLayout = function getLayout(page) {
  return <Layout user={page.props.user}> {page}</Layout>

}