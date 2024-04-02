import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { newGroupChat } from "../controller/chat.js";

const app = express.Router();

//after here user must be logged in to access these routes
app.use(isAuthenticated);
app.post("/new", newGroupChat);

export default app;
