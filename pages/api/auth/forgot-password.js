import { v4 } from "uuid";
import { hash } from "bcryptjs"
import { dbConnection } from "@/lib/mongodb"
import { getCurrentDate } from '@/helpers/index'
import User from "@/models/user"
import sendEmail from "@/lib/sendEmail";
import { isUsername, isEmail } from "@/helpers/index";

const handler = async (req, res) => {

  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      toast: [{ message: 'Bad Request', type: 'error' }]
    })
  await dbConnection().catch(err => res.json(err))

  const { userInput } = req.body;

  let user = undefined;
  if (isUsername(userInput)) {
    user = await User.findOne({ username: userInput })
  }
  else if (isEmail(userInput)) {
    user = await User.findOne({ email: userInput })
  } else {
    return res.status(200).json({
      success: true,
      toast: [{ message: 'Invalid input. Enter your email or your username', type: 'error' }]
    })
  }
  if (!user) {
    return res.status(200).json({
      success: true,
      toast: [{ message: 'The input you typed does not exists', type: 'error' }]
    })
  }

  const { host } = req.headers;
  const protocol = req.connection.encrypted ? 'https' : 'http';
  const uuid = v4();
  const hashedUUID = await hash(uuid, 13)
  const localhostUrl = `${protocol}://${host}/views/public/auth/change-password?password-token=${hashedUUID}&email=${user.email}`;

  const data = {
    datetime: getCurrentDate(),
    title_header: "MMDAF Forgot Password",
    official_site_link: "https://mmda.gov.ph",
    original_paper_link: "#",
    discord_link: "https://discord.gg/u75GxCYFxy",
    title: "Changing your password",
    subtitle: "Click the button below to redirect to another link for you to change your password",
    main_button_link: localhostUrl,
    main_button: "Change Password",
    subheader: "Avoid delays: Check our real-time traffic accident forecasting.",
    description: "Ready to make a positive change in Metro Manila? Register now with MMDA and be part of the solution!",
    button_description_link: "https://mmdaf.vercel.app/",
    button_description: "Visit Official Site"
  }

  const sendEmailConfirmation = await sendEmail({ to: user.email, subject: "MMDAF - Change Password", data });
  if (sendEmailConfirmation.success === false) {
    return res.status(400).json({
      success: false,
      toast: [
        { message: 'Something wrong resending email', type: 'error' }
      ]
    });
  }

  user.changePasswordToken = uuid;
  await user.save();

  return res.status(200).json({
    success: true,
    toast: [{ message: 'Successfully Sending change password email', type: 'success' }]
  })


}

export default handler