import React from "react";
import Layout from "@/components/Layout";

export default function VehicleType() {
  return (
    <h1> VehicleType </h1>
  )
}

VehicleType.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}