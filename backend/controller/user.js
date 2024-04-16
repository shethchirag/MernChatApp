import { compare } from "bcrypt";
import {
  cookieOptions,
  emitEvent,
  sendToken,
  uploadFilesToCloudinary,
} from "../Utils/features.js";
import { User } from "../models/user.js";
import { TryCatch } from "../middleware/error.js";
import { ErrorHandler } from "../Utils/utility.js";
import { Chat } from "./../models/chat.js";
import { Request } from "./../models/request.js";
import { NEW_REQUEST, REFETCH_CHAT } from "../constant/event.js";
import { getOtherMember } from "../lib/helper.js";

// Create a new user and save it to the database and save token in cookie
const newUser = TryCatch(async (req, res, next) => {
  const { name, username, password, bio } = req.body;

  const file = req.file;

  if (!file) return next(new ErrorHandler("Please Upload Avatar"));

  const result = await uploadFilesToCloudinary([file]);

  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User created");
});

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid UserName or Password", 404));

  const isMatch = await compare(password, user.password);
  if (!isMatch)
    return next(new ErrorHandler("Invalid UserName or Password", 404));

  sendToken(res, user, 200, `Welcome Back ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);
  if (!token)
    return next(new ErrorHandler("Please Login to access this resource", 404));
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

const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;
  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });
  if (request) return next(new ErrorHandler("Already sent request", 400));
  await Request.create({
    sender: req.user,
    receiver: userId,
  });
  emitEvent(req, NEW_REQUEST, [userId]);
  return res.status(200).json({
    success: true,
    message: "Friend request sent successfully",
  });
});
const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");
  if (!request) return next(new ErrorHandler("Request not found", 404));
  if (request.receiver._id.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You can't accept this request not authorized", 400)
    );
  if (!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success: true,
      message: "friend request rejected ",
    });
  }
  const members = [request.sender._id, request.receiver._id];
  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name} and ${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHAT, members);
  return res.status(200).json({
    success: true,
    message: "Friend request Accepted",
    senderId: request.sender._id,
  });
});

const getAllNotifications = TryCatch(async (req, res) => {
  const requests = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );

  const allRequest = requests.map(({ sender, _id }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));

  res.status(200).json({
    success: true,
    allRequest,
  });
});

const getMyFriends = TryCatch(async (req, res) => {
  const chatId = req.query.chatId;
  const chats = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");
  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user);
    return {
      _id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);
    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    );

    res.status(200).json({
      success: true,
      friends: availableFriends,
    });
  } else {
    res.status(200).json({
      success: true,
      friends,
    });
  }
});

export {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  getAllNotifications,
  getMyFriends,
};
