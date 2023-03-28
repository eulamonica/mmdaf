import React from "react";
import Layout from "@/components/Layout";
export default function Hourly() {
  return (
    <h1> Hourly </h1>
  )
}

Hourly.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}