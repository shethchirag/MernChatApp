import { ErrorHandler } from "../Utils/utility.js";

import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["chirag-token"];
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

export { isAuthenticated, isAuthenticatedAdmin };
