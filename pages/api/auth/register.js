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
      error: [{ message: 'Bad Request', value: 'toast' }]
    })

  const {
    username,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    secretPassword,
  } = req.body;

  const error = {
    username: [],
    firstName: [],
    lastName: [],
    email: [],
    password: [],
    confirmPassword: [],
    secretPassword: [],
  }
  // Username validation
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

  // Email validation
  if (!email) {
    error.email.push('Email is required.');
  }
  if (email && !(/^\S+@\S+\.\S+$/).test(email)) {
    error.email.push('Email must be a valid format.');
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
  if (secretPassword === process.env.NEU_SECRET_PASSWORD) {
    error.secretPassword.push('Secret password is invalid');
  }

  // Check if there are any errors
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

  return res.status(405).json({
    success: true,
    error: [{ message: 'Successfully Created an Account', type: 'success' }]
  })

}

export default handler