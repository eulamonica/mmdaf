import React from "react";
import Layout from "@/components/Layout";

export default function Profile() {
  return (
    <h1> Profile </h1>
  )
}

Profile.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}