import axios from "axios";
import jwt from "jsonwebtoken";
import { oauth2client } from "../utils/googleConfig.js";
import UserModel from "../models/userModel.js";

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`,
    );

    const { email, name, picture } = userRes.data;
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({
        name,
        email,
        profilePic: picture,
      });
    }
    const { _id } = user;
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.log("FULL GOOGLE ERROR 👉", err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export { googleLogin };
