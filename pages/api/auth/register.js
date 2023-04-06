import { NextApiRequest, NextApiResponse } from "next"
import { v4 } from "uuid";
import { hash } from "bcryptjs"
import { dbConnection } from "@/lib/mongodb"
import { getCurrentDate } from '@/helpers/index'
import User from "@/models/user"
import sendEmail from "@/lib/sendEmail";

const handler = async (req, res) => {

  await dbConnection().catch(err => res.json(err))

  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      toast: [{ message: 'Bad Request', type: 'error' }]
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

  const usernameExists = await User.findOne({ username })
  const emailExists = await User.findOne({ email })

  // Username validation
  if (usernameExists) {
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

  // Email validation
  if (!email) {
    error.email.push('Email is required.');
  }
  if (emailExists) {
    error.email.push('Email already exists.');
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


  const { host } = req.headers;
  const protocol = req.connection.encrypted ? 'https' : 'http';
  const hashedPassword = await hash(password, 12)
  const hashedUUID = await hash(v4(), 13)
  const localhostUrl = `${protocol}://${host}/views/public/auth/email-verification?email-token=${hashedUUID}`;

  const data = {
    datetime: getCurrentDate(),
    title_header: "MMDAF Email Verification",
    official_site_link: "https://mmda.gov.ph",
    original_paper_link: "#",
    discord_link: "https://discord.gg/u75GxCYFxy",
    title: "Thank you for signing up",
    subtitle: "Please click the button below to verify your email",
    main_button_link: localhostUrl,
    main_button: "Veify Email",
    subheader: "Avoid delays: Check our real-time traffic accident forecasting.",
    description: "Ready to make a positive change in Metro Manila? Register now with MMDA and be part of the solution!",
    button_description_link: "https://mmdaf.vercel.app/",
    button_description: "Visit Official Site"
  }


  const sendEmailConfirmation = await sendEmail({ to: email, subject: "Email verification", data });
  if (sendEmailConfirmation.success === false) {
    return res.status(400).json({
      success: false,
      errors: error,
      toast: [
        { message: 'Something wrong creating profile', type: 'error' }
      ]
    });
  }

  const userForm = new User({
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    emailToken: hashedUUID,
    isEmailVerified: false,
  });

  await userForm.save();
  return res.status(200).json({
    success: true,
    toast: [{ message: 'Successfully Created an Account', type: 'success' }]
  })

}

export default handler