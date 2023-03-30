import { NextApiRequest, NextApiResponse } from "next"
import { hash } from "bcryptjs"
import { dbConnection } from "@/lib/mongodb"
import User from "@/models/user"
import mongoose from "mongoose"

const handler = async (req, res) => {
  await dbConnection().catch(err => res.json(err))

  if (req.method !== "POST")
    return res.status(405).json({ success: false, error: "Method Not Allowed" })
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    secretPassword,
  } = req.body


}

export default handler