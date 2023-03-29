import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;
if (!URI) {
  throw new Error('Invalid environment variable: MONGODB_URI')
}

export const dbConnection = async () => {
  try {
    const { connection } = await mongoose.connect(URI);
    if (connection.readyState == 1) {
      return Promise.resolve(true)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}