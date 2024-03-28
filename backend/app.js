import express from "express";

import useRouter from "./routes/user.js";

const app = express();

app.use("/user", useRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
