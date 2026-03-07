import jwt from "jsonwebtoken";

export const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_TIMEOUT,
  });
  res.cookie("jwt", token, {
    httpOnly: true, //ye bachayega xss attack se
    sameSite: true, // ye hame secure rakhega
    secure: "strict", //ye hame secure rakhega csrs attack se
  });
};
