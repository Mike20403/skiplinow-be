import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { envConfig } from '~/constants/config';

const firebaseConfig = {
    apiKey: envConfig.firebaseConfigApiKey,
    authDomain: envConfig.firebaseConfigAuthDomain,
    projectId: envConfig.firebaseConfigProjectId,
    storageBucket: envConfig.firebaseConfigStorageBucket,
    messagingSenderId: envConfig.firebaseConfigMessagingSenderId,
    appId: envConfig.firebaseConfigAppId,
    measurementId: envConfig.firebaseConfigMeasurementId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const firestore = getFirestore(app);
