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
  await dbConnection().catch(err => res.json(err))
  const {
    userInput,
    password,
    secretPassword,
  } = req.body;

  const error = {
    userInput: [],
    password: [],
    secretPassword: []
  }

  let user = undefined;
  if (isUsername(userInput)) {
    user = await User.findOne({ username: userInput })
  }
  else if (isEmail(userInput)) {
    user = await User.findOne({ email: userInput })
  } else {
    error.userInput.push("Invalid input")
  }
  if (!user) {
    error.userInput.push("This user does not exist")
  }
  if (!userInput) {
    error.userInput.push('Email or username is required.');
  }
  if (!password) {
    error.password.push('Password is required.');
  }

  // Secret password validation
  if (!secretPassword) {
    error.secretPassword.push('Secret password is required.');
  }
  if (secretPassword !== process.env.NEU_SECRET_PASSWORD) {
    error.secretPassword.push('Secret password is invalid');
  }

  const hasErrors = Object.values(error).some(field => field.length > 0);
  if (hasErrors) {
    return res.status(400).json({
      success: false,
      errors: error,
      toast: [
        { message: 'Please correct the form inorder to proceed', type: 'error' }
      ]
    });
  }


  const isPasswordCorrect = await compare(password, user.password)
  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      errors: error,
      toast: [
        { message: 'Wrong Password', type: 'error' }
      ]
    });
  }
  const tokenPayload = {
    id: user.id,
    email: user.email,
    username: user.username,
    isEmailVerified: user.isEmailVerified,
  };

  const token = generateToken(tokenPayload);
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60}`);
  return res.status(200).json({
    success: true,
    toast: [{ message: 'Logged in successfuly', type: 'success' }]
  })
}

export default handler;