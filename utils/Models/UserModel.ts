import mongoose, { Model } from "mongoose";

interface IUserDocument extends Document {
  name: string;
  email: string;
  image: string;
  balance: number;
  userId: string;
  createdAt: Date;
}

function generateUserId() {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let userId = "";
  for (let i = 0; i < 4; i++) {
    userId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return userId;
}

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  userId: {
    type: String,
    default: generateUserId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.models.Users || mongoose.model("Users", schema);