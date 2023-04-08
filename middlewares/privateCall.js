import { verifyToken } from "@/lib/auth";

function checkAuth(req) {

  const token = req.cookies.token;
  if (!token) return { isLoggedIn: false };

  const decodedToken = verifyToken(token);
  if (!decodedToken) return { isLoggedIn: false };

  return { isLoggedIn: true, isEmailVerified: decodedToken.isEmailVerified, user: decodedToken }
}

const privateCall = (handler) => async (req, res) => {
  try {
    const authResult = checkAuth(req);
    const isAllowed = authResult.isLoggedIn && authResult.isEmailVerified
    if (!isAllowed) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

}

export default privateCall;