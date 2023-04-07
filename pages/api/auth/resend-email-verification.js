import User from "@/models/user"
import sendEmail from "@/lib/sendEmail";
import { getCurrentDate } from '@/helpers/index'
import { hash } from "bcryptjs"
import { v4 } from "uuid";

const handler = async (req, res) => {

  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      toast: [{ message: 'Bad Request', type: 'error' }]
    })

  const { email } = req.body;


  const userEmail = await User.findOne({ email });
  if (!userEmail) {
    return res.status(401).json({
      success: false,
      toast: [
        { message: 'Email does not exists', type: 'error' }
      ]
    })
  }


  const { host } = req.headers;
  const protocol = req.connection.encrypted ? 'https' : 'http';
  const uuid = v4();
  const hashedUUID = await hash(uuid, 13)
  const localhostUrl = `${protocol}://${host}/views/public/auth/email-verification?email-token=${hashedUUID}&email=${email}`;

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
      toast: [
        { message: 'Something wrong resending email', type: 'error' }
      ]
    });
  }



  userEmail.emailToken = uuid;
  userEmail.isEmailVerified = false;
  await userEmail.save();

  return res.status(200).json({
    success: true,
    toast: [{ message: 'Successfully sending email', type: 'success' }]
  })
}

export default handler