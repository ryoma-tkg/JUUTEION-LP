// ▼ 第2世代 (v2) のライブラリを使用
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import { defineSecret, defineString } from "firebase-functions/params";

admin.initializeApp();

// 許可された管理者のメールアドレス
const ALLOWED_EMAILS = [
    "takagi.buckup@gmail.com",
    "juuteion.events@gmail.com"
];

// ▼ Secrets (機密情報) と Params (設定値) の定義
const githubToken = defineSecret("GITHUB_TOKEN");
const githubRepo = defineString("GITHUB_REPO");

// ▼ onCall の定義 (v2 style)
// secrets: [githubToken] を渡すことで、関数内でこのシークレットにアクセス可能になります
export const triggerGithubDispatch = onCall({
    region: "asia-northeast1", // 東京リージョンを指定可能
    secrets: [githubToken]
}, async (request) => {
    // 1. 認証チェック (context ではなく request.auth を使用)
    if (!request.auth || !request.auth.token.email) {
        throw new HttpsError("unauthenticated", "認証が必要です。");
    }

    // 2. 権限チェック
    const email = request.auth.token.email;
    if (!ALLOWED_EMAILS.includes(email)) {
        throw new HttpsError("permission-denied", "この操作を行う権限がありません。");
    }

    // 3. 設定値の取得 (v2 style)
    const token = githubToken.value();
    const repo = githubRepo.value();

    if (!token || !repo) {
        throw new HttpsError("failed-precondition", "サーバー設定エラー: GitHub設定が不足しています。");
    }

    // 4. GitHub API (Repository Dispatch) を実行
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
            method: "POST",
            headers: {
                "Authorization": `token ${token}`,
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event_type: "publish_event",
                client_payload: {
                    triggered_by: email,
                    timestamp: new Date().toISOString()
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            logger.error("GitHub API Error", errorText);
            throw new Error(`GitHub API responded with ${response.status}: ${errorText}`);
        }

        return { success: true, message: "デプロイリクエストを送信しました。" };

    } catch (error: any) {
        logger.error("Deploy Trigger Error", error);
        throw new HttpsError("internal", "GitHubへのリクエストに失敗しました。", error.message);
    }
});