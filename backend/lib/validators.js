import { body, check, param, validationResult } from "express-validator";
import { ErrorHandler } from "../Utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessage = errors
    .array()
    .map((err) => err.msg)
    .join(", ");
  console.log(errorMessage);
  if (errors.isEmpty()) {
    return next();
  } else {
    return next(new ErrorHandler(errorMessage, 400));
  }
};
const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("bio", "Please Enter Bio").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const loginValidator = () => [
  body("username", "Please Enter a Username").notEmpty(),
  body("password", "Please Enter a Password").notEmpty(),
];

const newGroupChatValidator = () => [
  body("name", "Please Enter a Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Member")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

const addMembersValidator = () => [
  body("chatId", "Please Enter a ChatId").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Member")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];

const removeMemberValidator = () => [
  body("chatId", "Please Enter a ChatId").notEmpty(),
  body("userId", "Please Enter a UserId").notEmpty(),
];

const leaveGroupValidator = () => [
  param("id", "Please Enter a ChatId").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Please Enter a ChatId").notEmpty(),
  // check("files")
  //   .notEmpty()
  //   .withMessage("Please Enter Attachment")
  //   .isArray({ min: 1, max: 5 })
  //   .withMessage("Attachments must be 1-5"),
];

const chatIdValidator = () => [param("id", "Please Enter a ChatId").notEmpty()];

const renameGroupValidator = () => [
  param("id", "Please Enter a ChatId").notEmpty(),
  body("name", "Please Enter a Name").notEmpty(),
];

const deleteChatValidator = () => [
  param("id", "Please Enter a ChatId").notEmpty(),
];
const sendRequestValidator = () => [
  body("userId", "Please Enter a userId").notEmpty(),
];
const acceptRequestValidator = () => [
  body("requestId").notEmpty().withMessage("Please Enter a requestId"),
  body("accept", "Please Add accept")
    .notEmpty()
    .isBoolean()
    .withMessage("Accept must be boolean"),
];

const adminLoginValidator = () => [
  body("secretKey").notEmpty().withMessage("Please Enter secret key"),
];

export {
  registerValidator,
  validateHandler,
  loginValidator,
  newGroupChatValidator,
  addMembersValidator,
  removeMemberValidator,
  leaveGroupValidator,
  sendAttachmentsValidator,
  chatIdValidator,
  renameGroupValidator,
  deleteChatValidator,
  sendRequestValidator,
  acceptRequestValidator,
  adminLoginValidator,
};
