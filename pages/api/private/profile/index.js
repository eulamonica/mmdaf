import privateCall from "@/middlewares/privateCall";

import { dbConnection } from "@/lib/mongodb"
import User from "@/models/user"
import { generateToken } from "@/lib/auth";
import { compare } from "bcryptjs";

const changePassword = async (req, res) => {
  const { id, oldPassword, password, confirmPassword } = req.body;
  const error = {
    id: [],
    oldPassword: [],
    password: [],
    confirmPassword: [],
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

  const currentUser = await User.findById(id)
  const isPasswordValid = await compare(oldPassword, currentUser.password);
  if (!isPasswordValid) {
    error.oldPassword.push("Invalid old password")
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



  return res.status(200).json({
    success: true,
    errors: error,
    toast: [{ message: 'Successfully changes the password', type: 'success' }]
  })
}

const editProfile = async (req, res) => {
  const { id, firstName, lastName, username } = req.body;
  const error = {
    firstName: [],
    lastName: [],
    username: [],
  }
  const currentUser = await User.findById(id)
  const exisitingUser = await User.findOne({ username })

  // Username validation
  if (exisitingUser && currentUser.id !== exisitingUser.id) {
    error.username.push("Username already exists.")
  }

  if (!username) {
    error.username.push('Username is required.');
  }
  if (username && username.length < 3) {
    error.username.push('Username must be at least 3 characters long.');
  }

  // First name validation
  if (!firstName) {
    error.firstName.push('First name is required.');
  }
  if (firstName && !(/^[A-Za-z]+$/).test(firstName)) {
    error.firstName.push('First name must contain only letters.');
  }

  // Last name validation
  if (!lastName) {
    error.lastName.push('Last name is required.');
  }
  if (lastName && !(/^[A-Za-z]+$/).test(lastName)) {
    error.lastName.push('Last name must contain only letters.');
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

  currentUser.firstName = firstName
  currentUser.lastName = lastName
  currentUser.username = username
  await currentUser.save();

  const tokenPayload = {
    id: currentUser.id,
    email: currentUser.email,
    username: currentUser.username,
    isEmailVerified: currentUser.isEmailVerified,
  };
  const token = generateToken(tokenPayload);
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60}`);

  return res.status(200).json({
    success: true,
    toast: [{ message: 'Successfully edited the profile', type: 'success' }]
  })
}

const getProfile = async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id)
  if (!user) {
    return res.status(401).json({
      success: false,
      toast: [{ message: 'User does not exists', type: 'error' }]
    })
  }
  const { firstName, lastName, username } = user;
  return res.status(200).json({
    data: { firstName, lastName, username },
    success: true,
  })
}

const handler = async (req, res) => {

  await dbConnection().catch(err => res.json(err))

  if (req.method === 'POST')
    return await getProfile(req, res);

  if (req.method === 'PATCH')
    return await changePassword(req, res);

  if (req.method === 'PUT')
    return await editProfile(req, res)

  return res.status(405).json({
    success: false,
    toast: [{ message: 'Bad Request', type: 'error' }]
  })
}


export default privateCall(handler);