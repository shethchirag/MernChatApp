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

const app = express.Router();

app.post("/new", singleAvatar, newUser);
app.post("/login", login);

//after here user must be logged in to access these routes
app.use(isAuthenticated);

app.get("/me", getMyProfile);
app.get("/logout", logout);
app.get("/search", searchUsers);
export default app;
