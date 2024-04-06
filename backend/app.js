import express from "express";

import { connectDB } from "./Utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";
import useRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";
import { createMessageInAChat } from "./seeders/chat.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
connectDB(mongoURI);
// createUser(10);
// createSingleChats(10);
// createGroupChat(10);
// createMessageInAChat("660d11540f46e2e1cc926a2d", 49);

const app = express();

//using middleware here
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());

app.use("/user", useRouter);
app.use("/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
