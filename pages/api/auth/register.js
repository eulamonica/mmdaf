import { NextApiRequest, NextApiResponse } from "next"
import { hash } from "bcryptjs"
import { dbConnection } from "@/lib/mongodb"
import User from "@/models/user"
import mongoose from "mongoose"


const handler = async (req, res) => {
  dbConnection().catch(err => res.json(err))

}

export default handler