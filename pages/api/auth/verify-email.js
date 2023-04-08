import { v4 } from "uuid";
import { verifyToken, generateToken } from "@/lib/auth";
import { checkAuth } from "@/middlewares/auth";
import { compare } from "bcryptjs";
import { dbConnection } from "@/lib/mongodb"
import User from "@/models/user"

const handler = async (req, res) => {


  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      toast: [{ message: 'Bad Request', type: 'error' }]
    })

  await dbConnection().catch(err => res.json(err))
  const { email_token, email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: true,
      toast: [{ message: 'User does not existś', type: 'error' }]
    })
  }


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

  const authResult = checkAuth(req);
  if (authResult.isLoggedIn) {
    const tokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      isEmailVerified: user.isEmailVerified,
    };
    const token = generateToken(tokenPayload);
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60}`);
  }

  return res.status(200).json({
    success: true,
    toast: [{ message: 'Successfully verified the Account', type: 'success' }]
  })
}

export default handler;