import { IMailProvider, IMessage } from '../IMailProvider'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export class MailtrapMailProvider implements IMailProvider {
  private _transporter: Mail
  constructor() {
    this._transporter = nodemailer.createTransport({
      pool: true,
      host: process.env.MAILHOST,
      port: parseInt(process.env.MAIPORT),
      secure: process.env.MAILSECURE == 'TRUE', // use TLS
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS,
      },
    })
  }

  async sendEmail(massage: IMessage): Promise<void> {
    this._transporter.sendMail({
      to: {
        name: massage.to.name,
        address: massage.to.email,
      },
      from: {
        name: massage.from.name,
        address: massage.from.email,
      },
      subject: massage.subject,
      html: massage.body,
    })
  }
}
