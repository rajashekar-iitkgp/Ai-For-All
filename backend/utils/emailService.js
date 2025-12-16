const nodemailer = require("nodemailer");

let transporter = null;

const createTransporter = async () => {
    if (transporter) return transporter;

    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    return transporter;
};

const sendLoginNotification = async (email, name) => {
    try {
        const emailTransporter = await createTransporter();

        const info = await emailTransporter.sendMail({
            from: '"Ai-For-All Security" <security@aiforall.com>',
            to: email,
            subject: "Login Notification",
            text: `Hello ${name}, a new login was detected on your account.`,
            html: `<b>Hello ${name},</b><br>A new login was detected on your account.<br>If this was you, great! If not, please change your password.`,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return nodemailer.getTestMessageUrl(info);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = { sendLoginNotification };
