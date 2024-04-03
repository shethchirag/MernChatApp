import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getMyChats, newGroupChat } from "../controller/chat.js";

const app = express.Router();

//after here user must be logged in to access these routes
app.use(isAuthenticated);
app.post("/new", newGroupChat);
app.get("/my", getMyChats);

export default app;
