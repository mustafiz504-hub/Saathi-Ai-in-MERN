import jwt from "jsonwebtoken";

export const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_TIMEOUT,
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "none", // required for cross-domain
    secure: true, // required for sameSite none
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};
