import React from "react";
import Layout from "@/components/Layout";

export default function Monthly() {
  return (
    <h1> Monthly </h1>
  )
}

Monthly.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}