import { connectDb } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();

        const { email, password } = reqbody;

        console.log(reqbody);

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "user not already exsists" },
                { status: 400 }
            );
        }
        const valid = await bcryptjs.compare(password, user.password);
        if (!valid) {
            return NextResponse.json(
                { error: "password not valid" },
                { status: 400 }
            );
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "logged in successfully",
            success: true,
        });

        response.cookies.set("tokenchacha", token, { httpOnly: true });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
