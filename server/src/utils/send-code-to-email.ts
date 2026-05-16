import emailjs from "@emailjs/nodejs";
import {
  emailjsServiceId,
  emailjsPublicKey,
  emailjsPrivateKey,
  emailjsVerificationTemplateId,
  serverUrl,
} from "../config/index.js";

export default async function sendCodeToEmail(email, name, confirmCodeToken) {
  const verificationUrl = `${serverUrl}/api/auth/verify/${confirmCodeToken}`;

  await emailjs.send(
    emailjsServiceId,
    emailjsVerificationTemplateId,
    {
      to_email: email,
      name,
      description: "Click the button below to verify your email address.",
      verification_url: verificationUrl,
      app_name: "TemptateMe",
    },
    {
      publicKey: emailjsPublicKey,
      privateKey: emailjsPrivateKey,
    },
  );
}
