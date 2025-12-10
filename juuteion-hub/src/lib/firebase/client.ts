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
if (typeof window !== "undefined") {
    console.log("🔥 Firebase Config Check:", firebaseConfig);
}

// 二重初期化を防ぐためのチェック
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// FirestoreとStorageは常にエクスポート (SSGビルドで使用するため)
export const db = getFirestore(app);
export const storage = getStorage(app);

// ▼ 修正: Authは「ブラウザ環境 (windowがある時)」でのみ初期化する
// これにより、GitHub Actions等のビルド環境(Node.js)でAPIキーエラーが出るのを防ぎます
export const auth: Auth | null = (typeof window !== "undefined")
    ? getAuth(app)
    : null;