import express from "express";
import {
  allChats,
  allUsers,
  allMessages,
  getDashboardStats,
} from "../controller/admin.js";

const app = express.Router();
app.get("/");
app.post("/verify");
app.get("/logout");
app.get("/users", allUsers);
app.get("/chats", allChats);
app.get("/messages", allMessages);
app.get("/stats", getDashboardStats);

export default app;
