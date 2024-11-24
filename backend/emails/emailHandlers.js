import { mailtralClient, sender } from "../lib/mailtrap.js";
import {
  createCommentNotificationEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createWelcomeEmailTemplate,
} from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
  const recipient = [{ email }];

  try {
    const response = await mailtralClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome  to LinkedIn",
      html: createWelcomeEmailTemplate(name, profileUrl),
      category: "welcome",
    });

    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    throw error;
  }
};

export const sendCommentNotificationEmail = async (
  recipientEmail,
  recipientName,
  commenterName,
  postUrl,
  commentContent
) => {
  const recipient = [{ email: recipientEmail }];

  try {
    const response = await mailtralClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome  to LinkedIn",
      html: createCommentNotificationEmailTemplate(
        recipientName,
        commenterName,
        postUrl,
        commentContent
      ),
      category: "comment_notification",
    });
    console.log("Comment notification sent successfully", response);
  } catch (error) {
    throw error;
  }
};

export const sendConnectionAcceptedEmail = async (
  senderEmail,
  senderName,
  recipientName,
  profileUrl
) => {
  const recipient = [{ email: senderEmail }];

  try {
    const response = await mailtralClient.send({
      from: sender,
      to: recipient,
      subject: `${recipientName} accepted your connection request`,
      html: createConnectionAcceptedEmailTemplate(
        senderName,
        recipientName,
        profileUrl
      ),
      category: "connection_accepted",
    });
  } catch (error) {}
};
