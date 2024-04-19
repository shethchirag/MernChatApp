import { ErrorHandler } from "../Utils/utility.js";

import jwt from "jsonwebtoken";

import { User } from "../models/user.js";
import { CHIRAG_TOKEN } from "../constant/config.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies[CHIRAG_TOKEN];
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedData._id;

  next();
};
const isAuthenticatedAdmin = (req, res, next) => {
  const token = req.cookies["chirag-admin-token"];
  if (!token) {
    return next(new ErrorHandler("Only Admin Can Access", 401));
  }
  const secretKey = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
  const adminSecretKey = process.env.ADMIN_SECRET_KEY || "chirag";
  const isMatch = secretKey === adminSecretKey;
  if (!isMatch) return next(new ErrorHandler("Invalid Admin key", 401));

  next();
};

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies[CHIRAG_TOKEN];

    if (!authToken)
      return next(new ErrorHandler("Please login to access this route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if (!user)
      return next(new ErrorHandler("Please login to access this route", 401));

    socket.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Please login to access this route", 401));
  }
};

export { isAuthenticated, isAuthenticatedAdmin, socketAuthenticator };
