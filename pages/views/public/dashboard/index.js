import React from "react";
import Layout from "@/components/Layout";

export default function Dashboard() {
  return (
    <h1> Dashboard </h1>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}