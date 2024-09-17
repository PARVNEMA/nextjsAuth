import { connectDb } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDatafromToken } from "@/helper/getDatafromToken";


connectDb();

export async function POST(request: NextRequest) {
   try {
    const userId=await getDatafromToken(request);


    const user=await User.findOne({_id:userId});
    if(!user){
      return NextResponse.json({ msg: "user not found" }, { status: 500 });
    }

    return NextResponse.json({ msg: "user  found" ,data:user}, { status: 400 });

   } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
   }
}