import React from "react";
import Layout from "@/components/Layout";

export default function emailVerification() {
  return (
    <h1> emailVerification </h1>
  )
}

emailVerification.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}