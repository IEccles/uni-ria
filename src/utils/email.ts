import nodemailer from "nodemailer";
import Email from '../models/email'
import Logs from '../models/logs'
import { config as dotenv } from 'dotenv';

import settings from './settings'

dotenv();

/* console.log({
    host: process.env.smtp_host || 'smtp.google.com',
    port: process.env.smtp_port || 465,
    secure: process.env.smtp_port || 465 == 465,
    auth: {
        user: process.env.smtp_user,
        pass: process.env.smtp_password,
    },
}) */

const transporter = nodemailer.createTransport({
    host: process.env.smtp_host || 'smtp.google.com',
    port: process.env.smtp_port || 465,
    secure: process.env.smtp_port || 465 == 465,
    auth: {
        user: process.env.smtp_user,
        pass: process.env.smtp_password,
    },
});

export default async function (to, subject, content, user) {

    if (await settings('email_disabled')) {
        console.log('Emails are disabled which is causing an error and I\'m dragging out these messages so they stand out more in the console.')
        return;
    }

    try {
        if (!user) {
            console.log('You must supply a user to create an email.')
            return;
        }

        const info = await transporter.sendMail({
            from: `"${process.env.system_name || 'Rooted Treasures'} ${await settings('show_emoji_in_email_from') ? await settings('emoji_to_show_in_email_from') : '' }" <${process.env.smtp_email}>`, 
            to: to,
            subject: subject,
            html: content,
            attachments: [{
                filename: 'logo.text.png',
                path: './public/img/logo.text.png',
                cid: 'unique@nodemailer.com'
            }]
        });

        const email = await Email.create({
            recipient: to,
            content: content,
            sent: new Date(),
            messageId: info.messageId
        })

        Logs.create({
            user: user,
            log: `Sent email (${email.id}) to ${to} with subject ${subject}.`
        })
    } catch (err) {
        console.log(err)
    }
}
