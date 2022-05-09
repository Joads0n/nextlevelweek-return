import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1230f94551dd10",
      pass: "5aa6048f1e25a8"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedback <oi@feedback.com>',
            to: 'Joadson Silva <joadson83@gmail.com>',
            subject, 
            html: body
        });
    };
}