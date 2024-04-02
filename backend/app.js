import express from "express";
import useRouter from "./routes/user.js";
import { connectDB } from "./Utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/error.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
connectDB(mongoURI);
const app = express();

//using middleware here
app.use(express.json());
app.use(express.urlencoded());

app.use("/user", useRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
