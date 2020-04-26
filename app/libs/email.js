import nodemailer from 'nodemailer';
import config from '../config';

class EmailTransport {
  static getInstance() {
    if(!EmailTransport.instance) {
      EmailTransport.instance = new EmailTransport();
    }
    return EmailTransport.instance;
  }

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: config.smtpUser,
        pass: config.smtpPassword
      }
    });
  }
  

  async send(options) {
    return this.transporter.sendMail(options);
  }
}

export default EmailTransport;