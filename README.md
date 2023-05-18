# Vacation Auto Mail Reply

## Overview
The Vacation Auto Mail Reply is a JavaScript project that utilizes Google APIs to automatically send out vacation auto-reply emails to incoming messages during your absence. This project aims to provide a convenient and efficient solution for managing emails while you are on vacation or away from work.

## Features
- **Automated Email Responses**: The project automatically sends out vacation auto-reply emails using Google APIs in response to incoming messages, notifying the sender of your absence and providing relevant information.
- **Customizable Message**: You can customize the content of the auto-reply email to include details such as your vacation dates, alternative contacts, and any other relevant information.
- **Scheduled Activation**: You can set a specific start and end date for the auto-reply feature, ensuring that the vacation auto-reply is only sent during your designated absence period.
- **Selective Recipient Filtering**: The project allows you to define filters to determine which incoming messages trigger the auto-reply. You can set filters based on sender, subject, or other criteria to ensure that only relevant emails receive an auto-response.
- **Exclusion List**: You can create an exclusion list of email addresses or domains to prevent specific recipients from receiving the auto-reply.
- **Safe Mode**: The project includes a safe mode feature, allowing you to disable the auto-reply function temporarily if needed.
- **Detailed Logs**: The project keeps a record of sent auto-reply emails, including the date, recipient, and content, for future reference.

## Setup
To set up the Vacation Auto Mail Reply project, follow these steps:

1. **Clone the repository**: Clone the project repository from GitHub: `git clone https://github.com/your-username/vacation-auto-mail-reply.git`.

2. **Install dependencies**: Navigate to the project directory and install the required dependencies by running `npm install`.

3. **Google API Credentials**: Obtain the necessary credentials from the Google API Console:
   - Create a new project and enable the Gmail API.
   - Generate API credentials (OAuth 2.0 client ID) with the appropriate scopes.
   - Download the credentials JSON file and save it as `credentials.json` in the project's root directory.

4. **Configure settings**: Open the `config.js` file in the project directory and provide the necessary configuration details, such as your email account, vacation dates, filters, exclusion list, and safe mode settings. Follow the instructions in the file to complete the configuration.

5. **Running the Project**: Execute the main script by running `node index.js` in the project directory. The script will start monitoring incoming emails and send out auto-reply messages as configured.

6. **Logging**: You can view the logs of sent auto-reply emails in the console output. Additionally, you can customize the logging functionality in the code to save the logs to a file if desired.

## Customization
To customize the vacation auto-reply message, follow these steps:

1. Open the `templates.js` file in the project directory.

2. Modify the `generateAutoReplyMessage` function to suit your requirements. Include details such as your vacation dates, alternative contacts, and any other relevant information you want to convey in the auto-reply email.

3. Save the changes to the `templates.js` file.

## Contributing
Contributions to the Vacation Auto Mail Reply project are welcome! If you have any ideas, improvements, or bug fixes, please submit them as issues or pull requests on the project's GitHub repository.

## License
The Vacation Auto Mail Reply project is released under the [MIT License](LICENSE).

## Disclaimer
The Vacation Auto Mail Reply project is provided as-is without any warranty. Use it at your own risk. The authors and contributors are not responsible for any damages or consequences that may arise from using this project.

## Contact
For any questions, suggestions, or support, you can reach out to the project maintainer at [ping me](mailto:automationtest5926@gmail.com).
