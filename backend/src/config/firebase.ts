import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
  let serviceAccount;
  
  try {
    serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY 
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      : undefined;
  } catch (error) {
    console.warn('Invalid Firebase service account JSON. Please check your .env file.');
    console.warn('For local development, you can skip Firebase features.');
    serviceAccount = undefined;
  }

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
    console.log('Firebase initialized successfully');
  } else {
    console.warn('Firebase not initialized - no valid service account key provided');
    console.warn('Photo uploads will not work until Firebase is properly configured');
  }
}

export const auth = admin.apps.length > 0 ? admin.auth() : null;
export const storage = admin.apps.length > 0 ? admin.storage() : null;
export default admin;