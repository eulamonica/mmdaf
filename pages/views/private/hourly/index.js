import React from "react";
import Layout from "@/components/Layout";
import withAuth from "@/middlewares/auth";

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
export default function Hourly({ user }) {
  return (
    <h1> Hourly </h1>
  )
}

Hourly.getLayout = function getLayout(page) {
  return <Layout user={page.props.user}> {page}</Layout>

}