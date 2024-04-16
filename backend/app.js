import express from "express";

import { connectDB } from "./Utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";
import useRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";
import adminRouter from "./routes/admin.js";
import { createMessageInAChat } from "./seeders/chat.js";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constant/event.js";
import { v4 as uuid } from "uuid";
import { User } from "./models/user.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import cors from "cors";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "chirag";
export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

const userSocketIDs = new Map();

connectDB(mongoURI);
// createUser(10);
// createSingleChats(10);
// createGroupChat(10);
// createMessageInAChat("660d11540f46e2e1cc926a2d", 49);

const app = express();
const server = createServer(app);
const io = new Server(server, {});

//using middleware here
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(
  cors({
    origin: [
      "http://localhost:4173",
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

app.use("/api/v1/user", useRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

io.use((socket, next) => {});

io.on("connection", (socket) => {
  const user = {
    _id: "sheth",
    name: "chirag",
  };
  userSocketIDs.set(user._id.toString(), socket.id);
  console.log(userSocketIDs);
  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };
    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, {
      chatId,
    });
    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`server is running on port ${port} in ${envMode} mode`);
});

export { userSocketIDs };
