import { compare } from "bcryptjs"
import { isUsername, isEmail } from "@/helpers";
import { generateToken } from "@/lib/auth";
import User from "@/models/user";
import { dbConnection } from "@/lib/mongodb"

const handler = async (req, res) => {

  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      toast: [{ message: 'Bad Request', type: 'error' }]
    })

  res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0`);
  return res.status(200).json({
    success: true,
    toast: [{ message: 'Logged out successfuly', type: 'success' }]
  })

}

export default handler