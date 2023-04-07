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
  const { password, confirmPassword, secretPassword, email, changePasswordToken } = req.body
  const error = {
    password: [],
    confirmPassword: [],
    secretPassword: [],
  }

  await dbConnection().catch(err => res.json(err))
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      toast: [
        { message: 'User does not exist', type: 'error' }
      ]
    })
  }

  const isTokenCorrect = await compare(user.changePasswordToken, changePasswordToken)
  if (!isTokenCorrect) {
    return res.status(401).json({
      success: false,
      errors: error,
      toast: [
        { message: 'Token does not exist. Please try forgot password again', type: 'error' }
      ]
    });
  }

  // Password validation
  if (!password) {
    error.password.push('Password is required.');
  }
  if (password && password.length < 8) {
    error.password.push('Password must be at least 8 characters long.');
  }
  if (password && !(/[A-Z]/).test(password)) {
    error.password.push('Password must contain at least one uppercase letter.');
  }
  if (password && !(/[a-z]/).test(password)) {
    error.password.push('Password must contain at least one lowercase letter.');
  }
  if (password && !(/[0-9]/).test(password)) {
    error.password.push('Password must contain at least one digit.');
  }
  if (password && !(/[\W_]/).test(password)) {
    error.password.push('Password must contain at least one special character.');
  }

  // Confirm password validation
  if (!confirmPassword) {
    error.confirmPassword.push('Confirm password is required.');
  }
  if (password !== confirmPassword) {
    error.confirmPassword.push('Passwords do not match.');
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

  const uuid = v4();
  const hashedPassword = await hash(password, 12)
  user.changePasswordToken = uuid;
  user.password = hashedPassword;
  user.save();

  return res.status(200).json({
    success: true,
    toast: [{ message: 'Successfully changes the password', type: 'success' }]
  })
}

export default handler;