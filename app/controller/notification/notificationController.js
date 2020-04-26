import NotificationRepository from '../../repositories/notification';
import { htmlTemplate } from './helper';
import EmailTransport from '../../libs/email';
import { config } from 'dotenv';

class NotificationController {
  constructor() {
    this.notificationRepository = NotificationRepository.getInstance();
  }

  async create(req, res) {
    const { body } = req;
    const notificationReq = {
      ...body,
      read: false,
      createdAt: new Date()
    }
    const notificationRes = await this.notificationRepository.create(notificationReq);
    if (config.enableEmail) {
      this.sendEmailNotification(notificationRes);
    }
    res.send(notificationRes);
  }

  async sendEmailNotification(notification) {
    try {
      // Email notification
      const emailConfig = {
        text: textTemplate(notification),
        subject: 'Grover Industries Product Query',
        html: htmlTemplate(notification),
        to: 'mhtdang94@gmail.com',
        from: 'donotreply@groverindustries.com'
      }
      console.log("dadada", emailConfig);
      const emailRes = await EmailTransport.getInstance().send(emailConfig)
      console.log(":::emailRes", emailRes)
      // Update email Delivery
      await this.notificationRepository.update(notification._id, {
        emailDelivered: true,
        emailDeliveredAt: new Date()
      })
    } catch (err) {
      console.log("email error", err, notification._id);
      await this.notificationRepository.update(notification._id, {
        emailDelivered: false,
        emailDeliveredAt: new Date()
      })
    }

  }
}

export default NotificationController;