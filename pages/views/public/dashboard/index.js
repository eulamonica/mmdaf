import React from "react";
import Layout from "@/components/Layout";
import withAuth from '@/middlewares/auth';
import { checkAuth } from '@/middlewares/auth';

export default function Dashboard() {
  return (
    <h1> Dashboard </h1>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}

// export async function getServerSideProps(context) {
//   return withAuth(
//     async () => {
//       return {
//         props: {},
//       };
//     },
//     false, // Disable redirect if not authenticated
//     '/views/'
//   )(context.req);
// }
