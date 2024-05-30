import nodemailer from 'nodemailer';


import config from '../../config/index.js';
class EmailProvider {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.email.host,
            port: parseInt(config.email.port, 10),
            secure: config.email.secure === 'true', // true for 465, false for other ports
            auth: {
                user: config.email.user, 
                pass: config.email.pass 
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async sendMail(to, subject, text, html) {
        const mailOptions = {
            from: config.email.from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html // HTML body content
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}

export default EmailProvider;
