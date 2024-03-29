import mongoose from "mongoose";

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "MernChatApp" })
    .then((data) =>
      console.log(`Database connected with server: ${data.connection.host}`)
    )
    .catch((err) => {
      throw err;
    });
};

export { connectDB };
