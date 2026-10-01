const { Resend } = require("resend");
const { resendApiKey, appBaseUrl, emailFrom } = require("../config/env");
const { logger } = require("../utils/logger");
const AppError = require("../errors/appError");

const resend = new Resend(resendApiKey);

const sendVerificationEmail = async (email, token, verificationType) => {
  try {
    let verificationUrl;
    if (verificationType === "user") {
      verificationUrl = `${appBaseUrl}/auth/verify-email?token=${encodeURIComponent(token)}`;
    } else if (verificationType === "organizer") {
      verificationUrl = `${appBaseUrl}/organizers/verify-email?token=${encodeURIComponent(token)}`;
    } else {
      throw new AppError("Invalid verification role", 400);
    }

    const { error } = await resend.emails.send({
      from: emailFrom,
      to: [email],
      subject: "Verify your email",
      html: `<p>Click the link to verify your email: <a href="${verificationUrl}">Verify Email</a></p>`,
    });

    if (error) {
      throw error;
    }
  } catch (err) {
    logger.error({ err }, "Failed to send email verification");
    throw err;
  }
};

module.exports = sendVerificationEmail;
