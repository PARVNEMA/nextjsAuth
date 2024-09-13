import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });

        const mailOptions = {
            from: "naman@naman.com", // sender address
            to: email, // list of receivers
            subject:
                emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password", // Subject line

            html: "<b>Hello world?</b>", // html body
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
