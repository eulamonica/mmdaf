import { NextApiRequest, NextApiResponse } from "next"
import { v4 } from "uuid";
import { hash } from "bcryptjs"
import { dbConnection } from "@/lib/mongodb"
import { getCurrentDate } from '@/helpers/index'
import User from "@/models/user"
import sendEmail from "@/lib/sendEmail";

const handler = async (req, res) => {

  await dbConnection().catch(err => res.json(err))
  const { email_token } = req.body;

  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      toast: [{ message: 'Bad Request', type: 'error' }]
    })

  const user = await User.findOne({ emailToken: email_token });
  if (!user) {
    return res.status(400).json({
      success: true,
      toast: [{ message: 'Token does not exists', type: 'success' }]
    })
  }

  user.emailToken = "n/a";
  user.isEmailVerified = true;
  await user.save();

  return res.status(200).json({
    success: true,
    toast: [{ message: 'Successfully verified the Account', type: 'success' }]
  })
}

export default handler;