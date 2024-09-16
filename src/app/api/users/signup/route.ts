import { connectDb } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();

        const { username, email, password } = reqbody;

        console.log(reqbody);

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: "user already exsists" },
                { status: 400 }
            );
        }
        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "user registered successfully",
            success: true,
            savedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
