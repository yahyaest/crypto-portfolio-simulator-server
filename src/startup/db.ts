import mongoose from "mongoose";

export const db = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kf0nx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err: Error) =>
      console.log("Could not connect to MongoDB... ", err)
    );
};
