import React from "react";
import Layout from "@/components/Layout";
export default function Age() {
  return (
    <h1> Age </h1>
  )
}

Age.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}