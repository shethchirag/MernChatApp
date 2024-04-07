import express from "express";
import {
  getMyProfile,
  login,
  logout,
  newUser,
  searchUsers,
} from "../controller/user.js";
import { singleAvatar } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  loginValidator,
  registerValidator,
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
export default app;
