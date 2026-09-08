const { Resend } = require("resend");
const { resendApiKey, appBaseUrl } = require("../config/env");
const { logger } = require("../utils/logger");
const AppError = require("../errors/appError");

const resend = new Resend(resendApiKey);

const sendVerificationEmail = async (email, token) => {
  try {
    const verificationUrl = `${appBaseUrl}/auth/verify-email?token=${encodeURIComponent(token)}`;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email",
      html: `<p>Click the link to verify your email: <a href="${verificationUrl}">Verify Email</a></p>`,
    });
    return data;
  } catch (err) {
    logger.error({ err, email }, "Failed to send email verification");
    throw new AppError("Failed to send verification email", 500);
  }
};

// resend.emails.send({
//   from: "onboarding@resend.dev",
//   to: "jezemiahsam48@gmail.com",
//   subject: "Hello World",
//   html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
// });
