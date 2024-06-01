import { UserModel } from "@/utils/Models/UserModel"
import { NextResponse } from "next/server"

export const POST = async (req:Request) => {
  const {id, balance} = await req.json()

  try {
    const userInfo = await UserModel.findByIdAndUpdate(id,{balance})

    return NextResponse.json({userInfo, success: true})
    
  } catch (error) {
    
  }
}