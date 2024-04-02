import { emitEvent } from "../Utils/features.js";
import { ErrorHandler } from "../Utils/utility.js";
import { ALERT, REFETCH_CHAT } from "../constant/event.js";
import { TryCatch } from "../middleware/error.js";
import { Chat } from "./../models/chat.js";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;
  if (members.length < 2)
    return next(new ErrorHandler("Group must have at least 3 members", 400));

  const allMembers = [...members, req.user];
  console.log(allMembers);

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group `);
  emitEvent(req, REFETCH_CHAT, members);

  return res.status(201).json({
    success: true,
    message: "GroupCreated",
  });
});

export { newGroupChat };
