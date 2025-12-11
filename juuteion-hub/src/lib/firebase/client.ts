import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, type Auth } from "firebase/auth";
// ▼ 追加
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

if (typeof window !== "undefined") {
    console.log("🔥 Firebase Config:", JSON.stringify(firebaseConfig, null, 2));
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
// ▼ 追加: Functionsのインスタンス化 (リージョンは東京: asia-northeast1 推奨)
export const functions = getFunctions(app, "asia-northeast1");

export const auth: Auth | null = (typeof window !== "undefined") ? getAuth(app) : null;