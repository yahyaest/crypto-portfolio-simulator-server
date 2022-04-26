import mongoose from "mongoose";

export const db = () => {
  mongoose
    .connect(process.env.app_db as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err: Error) =>
      console.log("Could not connect to MongoDB... ", err)
    );
};
