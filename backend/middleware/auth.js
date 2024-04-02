import { ErrorHandler } from "../Utils/utility.js";
import { TryCatch } from "./error.js";

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

export { isAuthenticated };
