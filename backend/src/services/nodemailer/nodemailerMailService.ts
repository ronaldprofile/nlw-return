import { MailService, MailServiceData } from "../mailService";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0622a08c6fec8a",
    pass: "a25acb9c3d3acb"
  }
});

export class NodemailerMailService implements MailService {
  async sendMail({ subject, body }: MailServiceData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Ronald Tomaz <ronaldtmprofile@gmail.com>",
      subject,
      html: body
    });
  }
}
