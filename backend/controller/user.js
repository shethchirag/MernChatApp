import { compare } from "bcrypt";
import { sendToken } from "../Utils/features.js";
import { User } from "../models/user.js";
import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../Utils/utility.js";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "randomid",
    url: "https://www.w3schools.com/w3images/avatar2.png",
  };

  const user = await User.create({
    name,
    username,
    password,
    bio,
    avatar,
  });
  // res.status(201).json({ message: "user created successful" });
  sendToken(res, user, 201, "User created successfully");
};

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid UserName or Password", 404));

  const isMatch = await compare(password, user.password);
  if (!isMatch)
    return next(new ErrorHandler("Invalid UserName or Password", 404));

  sendToken(res, user, 200, `Welcome Back ${user.name}`);
});

const getMyProfile = async (req, res) => {};

export { login, newUser, getMyProfile };
