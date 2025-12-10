import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, type Auth } from "firebase/auth"; // type Auth を追加

const firebaseConfig = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// 二重初期化を防ぐためのチェック
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);

// ▼ 修正: Authの初期化をブラウザ環境でのみ実行し、サーバー(ビルド)環境ではnullを返す
// これにより、GitHub Actionsでのビルド時に API Key エラーが出るのを防ぎます
export const auth: Auth | null = typeof window !== "undefined" ? getAuth(app) : null;