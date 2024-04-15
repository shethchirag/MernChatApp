import { ErrorHandler } from "../Utils/utility.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatch } from "../middleware/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../Utils/features.js";
import { adminSecretKey } from "../app.js";

const adminLogin = TryCatch(async (req, res, next) => {
  const { secretKey } = req.body;

  const isMatch = secretKey === adminSecretKey;
  if (!isMatch) return next(new ErrorHandler("Invalid secret key", 401));
  const token = jwt.sign(secretKey, process.env.ADMIN_SECRET_KEY);

  return res
    .status(200)
    .cookie("chirag-admin-token", token, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 15,
    })
    .json({
      success: true,
      message: "Authenticated Successfully,WellCome Admin",
    });
});
const adminLogout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("chirag-admin-token", "", {
      ...cookieOptions,
      maxAge: 0,
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
});

const getAdminData = TryCatch(async (req, res, next) => {
  return res.status(200).json({
    admin: true,
  });
});

const allUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});
  const transformedUsers = await Promise.all(
    users.map(async ({ _id, name, username, avatar }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ]);
      return {
        name,
        username,
        avatar: avatar.url,
        _id,
        groups,
        friends,
      };
    })
  );

  return res.status(200).json({
    success: true,
    users: transformedUsers,
  });
});

const allChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const transformedChats = await Promise.all(
    chats.map(async ({ _id, name, members, groupChat, creator }) => {
      const totalMessages = await Message.countDocuments({ chat: _id });
      return {
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map((member) => member.avatar.url),
        members: members.map(({ _id, name, avatar }) => ({
          _id,
          name,
          avatar: avatar.url,
        })),
        creator: {
          name: creator?.name || "none",
          avatar: creator?.avatar.url || "",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );

  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const allMessages = TryCatch(async (req, res, next) => {
  const messages = await Message.find({})
    .populate("sender", "name avatar")
    .populate("chat", "groupChat");

  const transformedMessages = messages.map(
    ({ content, attachments, _id, sender, createdAt, chat }) => ({
      _id,
      attachments,
      content,
      createdAt,
      chat: chat._id,
      groupChat: chat.groupChat,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url,
      },
    })
  );
  return res.status(200).json({
    success: true,
    messages: transformedMessages,
  });
});

const getDashboardStats = TryCatch(async (req, res, next) => {
  const [groupCount, usersCount, messageCount, totalChatsCount] =
    await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments(),
    ]);

  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const last7DaysMessages = await Message.find({
    createdAt: { $gte: last7Days, $lte: today },
  }).select("createdAt");

  const messages = new Array(7).fill(0);
  last7DaysMessages.forEach((message) => {
    const indexApprox =
      (today.getTime() - message.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    const index = Math.floor(indexApprox);
    messages[6 - index]++;
  });

  const stats = {
    groupCount,
    usersCount,
    messageCount,
    totalChatsCount,
    messagesChart: messages,
  };
  return res.status(200).json({
    success: true,
    stats,
  });
});

export {
  allUsers,
  allChats,
  allMessages,
  getDashboardStats,
  adminLogin,
  adminLogout,
  getAdminData,
};
