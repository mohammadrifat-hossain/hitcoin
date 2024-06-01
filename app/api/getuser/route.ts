import { ConnectDB } from "@/utils/ConnectDB";
import { UserModel } from "@/utils/Models/UserModel";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email } = await req.json();
  try {
    if (!email) {
      return NextResponse.json({ success: false, message: "Email not found" });
    }
    await ConnectDB();
    const userInfo = await UserModel.findOne({ email });

    if (!userInfo) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    
    return NextResponse.json({ success: true, userInfo });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
