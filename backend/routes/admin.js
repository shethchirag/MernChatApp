import express from "express";
import {
  allChats,
  allUsers,
  allMessages,
  getDashboardStats,
  adminLogin,
  adminLogout,
  getAdminData,
} from "../controller/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { isAuthenticatedAdmin } from "../middleware/auth.js";

const app = express.Router();

app.post("/verify", adminLoginValidator(), validateHandler, adminLogin);
app.get("/logout", adminLogout);

//only admin can access
app.use(isAuthenticatedAdmin);

app.get("/", getAdminData);
app.get("/users", allUsers);
app.get("/chats", allChats);
app.get("/messages", allMessages);
app.get("/stats", getDashboardStats);

export default app;
