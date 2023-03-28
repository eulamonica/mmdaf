import React from "react";
import Layout from "@/components/Layout";
import { useUser } from "@auth0/nextjs-auth0/client";
export default function Age() {
  const { user, error, isLoading } = useUser();

  return (
    <h1> Age </h1>
  )
}

Age.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}