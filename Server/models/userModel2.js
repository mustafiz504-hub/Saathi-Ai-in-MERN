import mongoose from "mongoose";

const User2Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmpassword: {
      type: String,
    },
  },
  {
    timestamps: true, //created At & Updated At
  },
);

const UserModel2 = mongoose.model("user", User2Schema);

export default UserModel2;
