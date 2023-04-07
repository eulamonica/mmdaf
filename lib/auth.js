import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(payload, expiresIn = '1d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
