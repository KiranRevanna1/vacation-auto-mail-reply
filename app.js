const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const app = express();
app.use(express.json());

// Gmail API credentials
const CLIENT_ID =
  "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "";
const REFRESH_TOKEN =
  "";
const LABEL_NAME = "AutoResponse";
const MIN_INTERVAL = 45;
const MAX_INTERVAL = 120;

// Create a Gmail API client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const gmail = google.gmail({ version: "v1", auth: oauth2Client });

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "", // Replace with your Gmail email address
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: oauth2Client.getAccessToken(),
  },
});

// Function to create a Gmail label
// Create label "AutoResponse" in Gmail
async function createLabel() {
  try {
    const label = {
      name: LABEL_NAME,
      labelListVisibility: "labelShow",
      messageListVisibility: "show",
    };
    await gmail.users.labels.create({ userId: "me", resource: label });
    console.log("Label created successfully:", label);
  } catch (error) {
    console.error("Error creating label:", error);
    throw error;
  }
}

// Function to send auto-response email
async function sendAutoResponse(email) {
  try {
    // Extract the sender email address and subject
    const sender = email.payload.headers.find(
      (header) => header.name === "From"
    ).value;
    const subject = email.payload.headers.find(
      (header) => header.name === "Subject"
    ).value;

    // Compose the reply email
    const reply = {
      from: "", // Replace with your Gmail email address
      to: sender,
      subject: `RE: ${subject}`,
      text: "Thank you for your email. I am currently out of office and will get back to you when I return.",
    };

    // Send the reply email using Nodemailer
    const result = await transporter.sendMail(reply);
    // Add label to the replied email
    const messageId = email.id
    const labels = await gmail.users.labels.list({ userId: "me" });
    const label = labels.data.labels.find((label) => label.name === LABEL_NAME);
    if (label) {
      const labelId = label.id;
      const modifyRequest = {
        addLabelIds: [labelId],
        ids: [messageId],
        removeLabelIds: ['UNREAD'],
      };
      await gmail.users.messages.modify({
        userId: "me",
        id: messageId,
        requestBody: modifyRequest,
      });
    } else {
      console.error("Label not found:", LABEL_NAME);
    }

    console.log(`Auto-response sent to ${sender}`);

    return result;
  } catch (error) {
    console.error("Error sending auto-response:", error);
    throw error;
  }
}

// Function to generate a random interval between min and max seconds
function generateRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to send auto-response in random intervals
async function sendAutoResponsesInRandomIntervals() {
  try {
    // Fetch new emails from Gmail
    const response = await gmail.users.messages.list({
      userId: "me",
      q: "is:unread",
    });
    const emails = response.data.messages || [];

    // Loop through the list of email messages and fetch the full email details
    const emailPromises = emails.map(async (email) => {
      const emailData = await gmail.users.messages.get({
        userId: "me",
        id: email.id,
      });
      return emailData.data;
    });

    // Await all the email promises to get the full email details
    const allEmails = await Promise.all(emailPromises);

    // Filter out emails that have no prior replies
    const firstTimeEmails = allEmails.filter(
      (email) => !email.payload.threadId
    );

    // Reply to first time emails using Nodemailer and add label
    const replyPromises = firstTimeEmails.map(async (email) => {
      await sendAutoResponse(email);
    });

    // Await all the reply promises
    await Promise.all(replyPromises);

    // Generate random interval between min and max seconds
    const interval = generateRandomInterval(MIN_INTERVAL, MAX_INTERVAL);

    console.log(`Next auto-response in ${interval} seconds`);

    // Call the function recursively after the interval
    setTimeout(sendAutoResponsesInRandomIntervals, interval * 1000);
  } catch (error) {
    console.error("Error sending auto-responses in random intervals:", error);
    throw error;
  }
}

// Call the function to start sending auto-responses in random intervals
sendAutoResponsesInRandomIntervals();

// Start the server
const port = 3000; // You can change the port number if desired
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
