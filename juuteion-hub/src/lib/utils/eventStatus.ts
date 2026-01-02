export type EventStatusLabel = "COMING SOON" | "NOW OPEN" | "FINISHED" | "ARCHIVE" | "LATEST REPORT";
export type EventStatusColor = "yellow" | "red" | "default" | "blue";

export interface StatusResult {
    label: EventStatusLabel;
    color: EventStatusColor;
    isLive: boolean; // 現在開催中かどうか
}

/**
 * イベントの開始・終了日時を算出する
 * @param dateObj 開催日 (00:00基準)
 * @param openTimeStr 開始時間 (例: "19:00")
 * @param closeTimeStr 終了時間 (例: "05:00") - 未指定なら開始+6時間とみなす
 */
export const getEventDates = (dateObj: Date, openTimeStr: string, closeTimeStr?: string) => {
    const start = new Date(dateObj);
    const end = new Date(dateObj);

    // 時間解析用ヘルパー
    const parseTime = (str: string) => {
        if (!str) return null;
        const match = str.match(/(\d{1,2}):(\d{2})/);
        return match ? { h: parseInt(match[1], 10), m: parseInt(match[2], 10) } : null;
    };

    // 1. 開始日時を設定
    const open = parseTime(openTimeStr);
    if (open) {
        start.setHours(open.h, open.m, 0, 0);
    } else {
        start.setHours(0, 0, 0, 0);
    }

    // 2. 終了日時を設定
    const close = parseTime(closeTimeStr || "");

    if (close) {
        // CLOSE時間が指定されている場合
        end.setHours(close.h, close.m, 0, 0);

        // ★日付またぎ自動判定
        // 「終了時刻」が「開始時刻」より小さい（例: Start 23:00, End 05:00）場合、
        // 終了は「翌日」であるとみなして1日進める
        if (end <= start) {
            end.setDate(end.getDate() + 1);
        }
    } else {
        // CLOSE時間が未指定の場合、開始から6時間後を仮の終了とする
        end.setTime(start.getTime() + 6 * 60 * 60 * 1000);
    }

    return { start, end };
};

export const getEventStatus = (
    date: Date,
    openTimeStr: string,
    closeTimeStr?: string,
    manualStatus?: string
): StatusResult => {
    // 1. 手動設定があれば最優先
    if (manualStatus && manualStatus !== "upcoming") {
        if (manualStatus === "open") return { label: "NOW OPEN", color: "red", isLive: true };
        if (manualStatus === "soldout") return { label: "COMING SOON", color: "yellow", isLive: false };
        if (manualStatus === "archive") return { label: "ARCHIVE", color: "default", isLive: false };
    }

    // 2. 自動判定
    const { start, end } = getEventDates(date, openTimeStr, closeTimeStr);
    const now = new Date();

    if (now < start) {
        return { label: "COMING SOON", color: "yellow", isLive: false };
    } else if (now >= start && now < end) {
        return { label: "NOW OPEN", color: "red", isLive: true };
    } else {
        return { label: "FINISHED", color: "default", isLive: false };
    }
};