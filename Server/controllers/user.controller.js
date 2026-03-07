import UserModel2 from "../models/userModel2.js";
import bcrypt from "bcryptjs";
import { createTokenAndSaveCookie } from "../jwt/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const user = await UserModel2.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    //Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new UserModel2({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      return res.status(201).json({
        message: "User registered successfully",
        newUser,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel2.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or Password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or Password" });
    }
    createTokenAndSaveCookie(user._id, res);
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
