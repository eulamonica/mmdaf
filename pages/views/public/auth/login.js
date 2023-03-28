import React from "react";
import Layout from "@/components/Layout";

export default function Login() {
  return (
    <h1> Login </h1>
  )
}

Login.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}