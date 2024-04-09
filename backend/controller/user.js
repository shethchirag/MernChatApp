import { compare } from "bcrypt";
import { cookieOptions, sendToken } from "../Utils/features.js";
import { User } from "../models/user.js";
import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../Utils/utility.js";
import { Chat } from "./../models/chat.js";

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

const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);
  res.status(200).json({
    success: true,
    user,
  });
});

const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("chirag-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logout Successfully",
    });
});

const searchUsers = TryCatch(async (req, res) => {
  const { username = "" } = req.query;
  const myChats = await Chat.find({ groupChat: false, members: req.user });

  // const users = await User.find({
  //   username: { $regex: username, $options: "i" },
  // });
  const allUsersFromChats = myChats.flatMap((chat) => chat.members);
  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromChats },
    username: { $regex: username, $options: "i" },
  });

  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => {
    return {
      _id,
      name,
      avatar: avatar.url,
    };
  });
  res.status(200).json({
    success: true,
    users,
  });
});

export { login, newUser, getMyProfile, logout, searchUsers };
