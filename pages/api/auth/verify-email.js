import { v4 } from "uuid";
import { dbConnection } from "@/lib/mongodb"
import User from "@/models/user"
import { compare } from "bcryptjs";


const handler = async (req, res) => {

  await dbConnection().catch(err => res.json(err))
  const { email_token, email } = req.body;

  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      toast: [{ message: 'Bad Request', type: 'error' }]
    })

  const user = await User.findOne({ email });
  const isTokenCorrect = await compare(user.emailToken, email_token);

  if (!isTokenCorrect) {
    return res.status(400).json({
      success: true,
      toast: [{ message: 'Token does not exists', type: 'error' }]
    })
  }
  const uuid = v4();
  user.emailToken = uuid;
  user.isEmailVerified = true;
  await user.save();

  return res.status(200).json({
    success: true,
    toast: [{ message: 'Successfully verified the Account', type: 'success' }]
  })
}

export default handler;