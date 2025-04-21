import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";
export const sendVerificatioEmail = async (email, verificatioToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificatioToken
      ),
      category: "Email Verification",
    });
    console.log("email sent successfully", response);
  } catch (error) {
    console.error(`error sending verification email: `, error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "0e41f5a3-ff70-49ad-a4ec-237dd78c64d1",
      template_variables: {
        company_info_name: "Muteeb's Auth Company",
        name: name,
      },
    });
    console.log("welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending Welcome Email`, error);
    throw new Error(`Error sending welcome email : ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: " Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.log(`Error sending password reset email`, email);

    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log(" Password rest email sent successfully", response);
  } catch (error) {
    console.log(`error sending password reset success email ${error}`);
    throw new Error(`Error sending password reset success email ${error}`);
  }
};
