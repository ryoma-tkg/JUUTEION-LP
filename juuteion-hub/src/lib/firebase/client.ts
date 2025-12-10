import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// 二重初期化を防ぐためのチェック
// apiKeyが存在しない場合（環境変数がロードされていない場合）は初期化しない
const app = (!getApps().length && firebaseConfig.apiKey)
    ? initializeApp(firebaseConfig)
    : (getApps().length ? getApp() : null);

// アプリが初期化されていない場合はダミーを返すかnullを扱う設計にするが、
// Firestoreなどは初期化必須のため、アプリがない場合はエラーになる可能性があります。
// ただし、Authエラーだけを回避するなら以下のようにします。

export const db = app ? getFirestore(app) : {} as any;
export const storage = app ? getStorage(app) : {} as any;

// ▼ 修正: APIキーがあり、かつブラウザ環境の場合のみ Auth を初期化
export const auth: Auth | null = (typeof window !== "undefined" && app && firebaseConfig.apiKey)
    ? getAuth(app)
    : null;