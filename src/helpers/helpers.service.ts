import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { IDataEmail } from 'src/common/interfaces/dataEmail.interface';

@Injectable()
export class HelpersService {
  hashPassword(password: string) {
    const salt = bcryptjs.genSaltSync();
    const hash = bcryptjs.hashSync(password, salt);
    return hash;
  }

  verifyPassword(password: string, hash_password: string) {
    const valid = bcryptjs.compareSync(password, hash_password);
    return valid;
  }

  generateToken(key: any, expire: boolean) {
    let token: string;
    if (expire) {
      token = jwt.sign({ key }, process.env.JWT_SECRET, {
        expiresIn: '30m',
      });
    } else {
      token = jwt.sign({ key }, process.env.JWT_SECRET);
    }
    return token;
  }

  verifyToken(token: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      return payload['key'];
    } catch (error) {
      console.log(`[ERROR] - verifyToken - helpers.service.ts`);
      console.log(error.message);
    }
  }

  async sendEmail({ subject, text, to }: IDataEmail) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      const info_email = await transporter.sendMail({
        from: `"NPC 📧" <npccuba@gmail.com>`,
        to,
        subject,
        text,
      });

      return info_email;
    } catch (error) {
      console.log('[ERROR] - error al enviar el email helpers.service.ts');
      console.log(error);
    }
  }

  generateActivationCode(): string {
    let activation_code: number = Math.floor(Math.random() * 9);

    while (activation_code === 0) {
      activation_code = Math.floor(Math.random() * 9);
    }

    for (let i = 0; i < 5; i++) {
      activation_code = activation_code * 10 + Math.floor(Math.random() * 9);
    }

    return activation_code + '';
  }
}
