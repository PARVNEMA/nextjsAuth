import { connectDb } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connectDb();

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "logged out successfully",
            success: true,
        });

        response.cookies.set("tokenchacha", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
