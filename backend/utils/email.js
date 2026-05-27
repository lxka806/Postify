const nodemailer = require("nodemailer");

const sendEmail = async (op) => {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    console.log( process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD)

    try {
        await transporter.sendMail({
            from: '"Post Website" <test@mailtrap.io>',
            to: op.to,
            subject: op.subject,
            html: op.html
        });

        console.log("Email sent");
    } catch (e) {
        console.log("Error", e);
    }
};

module.exports = { sendEmail };