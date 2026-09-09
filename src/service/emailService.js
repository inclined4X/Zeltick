const { Resend } = require("resend");
const { resendApiKey, appBaseUrl } = require("../config/env");
const { logger } = require("../utils/logger");
const AppError = require("../errors/appError");

const resend = new Resend(resendApiKey);

const sendVerificationEmail = async (email, token) => {
  try {
    const verificationUrl = `${appBaseUrl}/auth/verify-email?token=${encodeURIComponent(token)}`;

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["jezemiahsam48@gmail.com"],
      subject: "Verify your email",
      html: `<p>Click the link to verify your email: <a href="${verificationUrl}">Verify Email</a></p>`,
    });

    if (error) {
      throw new AppError("failed to send email");
    }
  } catch (err) {
    logger.error({ err, email }, "Failed to send email verification");
    throw new AppError("Failed to send verification email", 500);
  }
};

module.exports = sendVerificationEmail;
