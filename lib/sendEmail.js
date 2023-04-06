import fs from 'fs';
import path from 'path';
import sgMail from '@sendgrid/mail';

function replacePlaceholders(template, dynamicData) {
  return template.replace(/\{\{(.*?)\}\}/g, (match, token) => {
    return dynamicData[token.trim()] || '';
  });
}



export default async function sendEmail({ to, subject, data }) {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const templatePath = path.join(process.cwd(), 'templates', 'auth-email-template.html');
  const templateContent = fs.readFileSync(templatePath, 'utf-8');

  const renderedTemplate = replacePlaceholders(templateContent, data);

  const msg = {
    to,
    from: 'phscapstonesystem@gmail.com',
    subject,
    html: renderedTemplate,
  };

  try {
    await sgMail.send(msg);
    return { success: true, message: 'Email sent successfully' }
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Failed to send email' }
  }
}