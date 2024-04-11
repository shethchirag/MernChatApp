import express from "express";
import {
  acceptFriendRequest,
  getMyProfile,
  login,
  logout,
  newUser,
  searchUsers,
  sendFriendRequest,
  getAllNotifications,
} from "../controller/user.js";
import { singleAvatar } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validators.js";

const app = express.Router();

app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);

//after here user must be logged in to access these routes
app.use(isAuthenticated);

app.get("/me", getMyProfile);
app.get("/logout", logout);
app.get("/search", searchUsers);
app.put(
  "/sendrequest",
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);
app.put(
  "/acceptrequest",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);
app.get("/notification", getAllNotifications);
export default app;
