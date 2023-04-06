import { Schema, model, models } from "mongoose"


const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const UserSchema = new Schema({

  username: {
    type: String,
    required: [true, 'Username is required.'],
    minlength: [3, 'Username must be at least 3 characters.'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    match: [emailRegex, 'Email is not valid.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [6, 'Password must be at least 6 characters.'],
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 30
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 30
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  emailToken: {
    required: true,
    type: String,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  }
});


const User = models.User || model("User", UserSchema)

export default User