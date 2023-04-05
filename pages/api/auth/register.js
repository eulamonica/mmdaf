import { NextApiRequest, NextApiResponse } from "next"
import { hash } from "bcryptjs"
import { dbConnection } from "@/lib/mongodb"
import User from "@/models/user"
import mongoose from "mongoose"

const handler = async (req, res) => {
  await dbConnection().catch(err => res.json(err))

  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      error: [
        {
          message: ''
        }
      ]
    })

  const values = req.body;



  console.log(req.body);
}

export default handler