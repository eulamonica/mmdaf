import React from "react";
import Layout from "@/components/Layout";

export default function ChangePassword() {
  return (
    <h1> ChangePassword </h1>
  )
}

ChangePassword.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}