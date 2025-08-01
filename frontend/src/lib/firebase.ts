import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Only initialize Firebase in the browser environment
let app: ReturnType<typeof initializeApp> | undefined;
let auth: ReturnType<typeof getAuth> | undefined;
let storage: ReturnType<typeof getStorage> | undefined;
let googleProvider: GoogleAuthProvider | undefined;

if (typeof window !== 'undefined' && firebaseConfig.apiKey) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
  googleProvider = new GoogleAuthProvider();
}

export { auth, storage, googleProvider };
export default app;