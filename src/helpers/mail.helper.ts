// utils/mail.util.ts
import nodemailer from 'nodemailer';

export const sendMail = async ({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) => {
    // Cấu hình transporter (ví dụ dùng Gmail)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // Gửi email
    const info = await transporter.sendMail({
        from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });

    console.log('Message sent: %s', info.messageId);
};
