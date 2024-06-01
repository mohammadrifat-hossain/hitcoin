import { User } from "next-auth";
import { ConnectDB } from "../ConnectDB";
import { UserModel } from "../Models/UserModel";

export const ResisterUser = async (userInfo: User) => {
  try {
    await ConnectDB();
    const alreadyRegistered = await UserModel.findOne({
      email: userInfo.email,
    });
    if (alreadyRegistered) {
      return JSON.stringify({ success: true });
    }
    await UserModel.create({
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.image,
    });
    return JSON.stringify({ success: true });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ success: false });
  }
};


export const GetUser = async (email: string) => {
  try {
    await ConnectDB();
    const userInfo = await UserModel.findOne({ email: email });

    if (!userInfo) {
      return JSON.stringify({ success: false });
    }
    console.log(userInfo);
    
    return JSON.stringify({ success: true, userInfo });
  } catch (error) {
    console.log("get user error", error); 
    return JSON.stringify({ success: false });
  }
};
