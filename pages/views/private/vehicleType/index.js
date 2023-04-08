import React from "react";
import Layout from "@/components/Layout";
import withAuth from "@/middlewares/auth";
import UnderConstruction from "@/components/profile/verifiedProfile";


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
export default function VehicleType({ user }) {
  return (
    <>
      <UnderConstruction pageName='Vehicle Type Page' />
    </>
  )
}

VehicleType.getLayout = function getLayout(page) {
  return <Layout user={page.props.user}> {page}</Layout>

}