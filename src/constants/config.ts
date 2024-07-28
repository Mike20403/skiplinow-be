import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
const env = process.env.NODE_ENV;
const envFilename = `.env.${env}`;

if (!env) {
    console.error('NODE_ENV is not set');
    process.exit(1);
}
console.log(`Detected NODE_ENV = ${env}, using ${envFilename}`);
if (!fs.existsSync(path.resolve(envFilename))) {
    console.log(`Environment file not found ${envFilename}`);
    console.log(`Please create file ${envFilename} and take examples from .env.example`);
    process.exit(1);
}
config({
    path: envFilename,
});
export const isProduction = env === 'production';

export const envConfig = {
    port: process.env.PORT || 4000,
    firebaseConfigApiKey: process.env.FIREBASE_CONFIG_API_KEY,
    firebaseConfigAuthDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
    firebaseConfigProjectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
    firebaseConfigStorageBucket: process.env.FIREBASE_CONFIG_STORAGE_BUCKET,
    firebaseConfigMessagingSenderId: process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    firebaseConfigAppId: process.env.FIREBASE_CONFIG_APP_ID,
    firebaseConfigMeasurementId: process.env.FIREBASE_CONFIG_MEASUREMENT_ID,
    firebaseUsersCollectionName: process.env.FIREBASE_USERS_COLLECTION_NAME,
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
};
