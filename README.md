Here’s a README for your backend repository:

---

# Skiplinow Backend

This repository contains the backend implementation for the Skiplinow challenge.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.x or later)
- npm (v6.x or later)
- Firebase Admin SDK service account key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mike20403/skiplinow-be.git
   cd skiplinow-be
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a `.env.development` file in the root directory of the project and add the following environment variables:

   ```env
	PORT=''
	FIREBASE_CONFIG_API_KEY=''
	FIREBASE_CONFIG_AUTH_DOMAIN=''
	FIREBASE_CONFIG_PROJECT_ID=''
	FIREBASE_CONFIG_STORAGE_BUCKET=''
	FIREBASE_CONFIG_MESSAGING_SENDER_ID=''
	FIREBASE_CONFIG_APP_ID=''
	FIREBASE_CONFIG_MEASUREMENT_ID=''
	FIREBASE_USERS_COLLECTION_NAME=''
	TWILIO_ACCOUNT_SID=''
	TWILIO_AUTH_TOKEN=''
	TWILIO_PHONE_NUMBER=''
	GEMINI_API_KEY=''
   ```
2. Because Twilio required to verify caller ID so, please make sure on your Twilio add you verified number to make sure twilio can send SMS to that number
3. If you don't have a Firebase Admin SDK service account key, generate one from the Firebase console and add it to your `.env` file.
4. For Gemini API key, go to this URL: https://ai.google.dev/gemini-api/docs/api-key and get you own key.

## Running the Project

1. Start the development server:

   ```bash
   npm run dev
   ```

   The backend should now be running on the port specified in your `.env.development` file.
   
## Note: This project require much time to setup so I've prepare a quickdemo vid:


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions or need further assistance, please open an issue on the GitHub repository or contact the repository owner.

---

Feel free to customize this README further based on your project's specific requirements and structure.
