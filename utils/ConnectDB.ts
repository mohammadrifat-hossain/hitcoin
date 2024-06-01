import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL as string);
    console.log("Mongoose connected");
  } catch (error) {
    console.log("db connect error");
  }
};
