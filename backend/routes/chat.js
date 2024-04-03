import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getMyChats, getMyGroups, newGroupChat } from "../controller/chat.js";

const app = express.Router();

//after here user must be logged in to access these routes
app.use(isAuthenticated);
app.post("/new", newGroupChat);
app.get("/my", getMyChats);
app.get("/my/group", getMyGroups);

export default app;
