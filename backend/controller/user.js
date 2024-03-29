import { sendToken } from "../Utils/features.js";
import { User } from "../models/user.js";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "randomid",
    url: "https://www.w3schools.com/w3images/avatar2.png",
  };

  const user = await User.create({
    name,
    username,
    password,
    bio,
    avatar,
  });
  // res.status(201).json({ message: "user created successful" });
  sendToken(res, user, 201, "User created successfully");
};

const login = (req, res) => {
  res.send("hello");
};

export { login, newUser };
