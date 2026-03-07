import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  profilePic: String,
});

const UserModel = mongoose.model("social-logins", UserSchema);

export default UserModel;
