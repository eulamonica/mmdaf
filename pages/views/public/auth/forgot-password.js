import React from "react";
import Layout from "@/components/Layout";

export default function ForgotPassword() {
  return (
    <h1> ForgotPassword </h1>
  )
}

ForgotPassword.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}