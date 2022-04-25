import mongoose, { Schema, Document } from "mongoose";
import * as Joi from "joi";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 20 },
});

export const User = mongoose.model<IUser>("User", userSchema);

export function validateUser(user: object) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(20).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
