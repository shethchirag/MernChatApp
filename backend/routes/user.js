import express from "express";
import { login, newUser } from "../controller/user.js";
import { singleAvatar } from "../middleware/multer.js";

const app = express.Router();

app.post("/new", singleAvatar, newUser);
app.post("/login", login);

//after here user must be logged in to access these routes

export default app;
