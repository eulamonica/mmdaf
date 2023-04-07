import { v4 } from "uuid";
import { hash, } from "bcryptjs"
import { dbConnection } from "@/lib/mongodb"
import { getCurrentDate } from '@/helpers/index'
import { isUsername, isEmail } from "@/helpers/index";
import { compare } from 'bcryptjs'
import User from "@/models/user";


const handler = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      toast: [{ message: 'Bad Request', type: 'error' }]
    })
  const { password, confirmPassword, secretPassword, changePasswordToken } = req.body
  await dbConnection().catch(err => res.json(err))
  // const isPasswordCorrect = await compare(, changePasswordToken)
  // bcrypt.hash(req.body.password, 10, function (error, response) { }
  // changePasswordToken
  console.log(req.body)


  return res.status(200).json({
    success: true,
    toast: [{ message: 'Successfully changes the password', type: 'success' }]
  })
}

export default handler;