const { Resend } = require("resend");
const { resendApiKey, appBaseUrl } = require("../config/env");

const resend = new Resend(resendApiKey);

const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${appBaseUrl}/auth/verify-email?token=${encodeURIComponent(token)}`;
  const data = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<p>Click the link to verify your email: <a href="${verificationUrl}">Verify Email</a></p>`,
  });
};

// resend.emails.send({
//   from: "onboarding@resend.dev",
//   to: "jezemiahsam48@gmail.com",
//   subject: "Hello World",
//   html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
// });
