import mongoose from "mongoose";

export async function connectDb() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("========mongo db connected========");
        });

        connection.on("error", (err) => {
            console.log("========mongo db connection error========" + err);
            process.exit();
        });
    } catch (error) {
        console.log("========mongo db connection error========");
        console.log(error);
        console.log("====================================");
    }
}
