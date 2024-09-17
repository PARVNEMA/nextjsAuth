import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDatafromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("tokenchacha")?.value || " ";

        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        return decodedToken.id;
    } catch (error: any) {
        throw new Error("error in getting id from token", error.message);
    }
};
