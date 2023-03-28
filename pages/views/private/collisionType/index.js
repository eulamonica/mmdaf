import React from "react";
import Layout from "@/components/Layout";
export default function CollisionType() {
  return (
    <h1> CollisionType </h1>
  )
}

CollisionType.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}