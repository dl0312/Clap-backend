import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandboxecb1010e31ec4647a4741d420b0be109.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "leegun2003@gmail.com",
    to: "leegun2003@gmail.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://dsfasdfdfadfheeber.com/verification/${key}/">here</a>`;
  return sendEmail(emailSubject, emailBody);
};
