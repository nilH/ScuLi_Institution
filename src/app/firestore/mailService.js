import { APIKEY } from "../../app/firestore/config/sendgrid";
const sgMail = require("@sendgrid/mail");

export function send(from, to, subject, text) {
  sgMail.setApiKey(APIKEY);
  const msg = {
    to: to, // Change to your recipient
    from: from, // Change to your verified sender
    subject: subject,
    text: text,
    html: "html",
  };
  return sgMail.send(msg);
}