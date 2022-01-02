import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private sgMail = SgMail;
  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get('SENDGRID_API_KEY') as string;

    this.sgMail.setApiKey(apiKey);
  }

  async sendConfirmEmail(key: string) {
    return this.sgMail.send({
      to: 'fox6383@gmail.com',
      from: 'fox6383@gmail.com',
      subject: 'Test message',
      text: `You key is ${key}`,
    });
  }
}
