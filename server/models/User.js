import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: String,
    title: String,
    profileImage: String,
    coverImage: String,
    address: String,
    about: String,
    phone: String,
    facebook: String,
    twitter: String,
    instagram: String,
    likes: [String],
    gender: String,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamps: true }
);

export default mongoose.model("User", userSchema);
