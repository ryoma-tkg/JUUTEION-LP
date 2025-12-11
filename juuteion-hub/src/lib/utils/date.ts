// src/lib/utils/date.ts

// JST (Asia/Tokyo) での日付フォーマット用オプション
const JST_OPTS: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
};

/**
 * DateオブジェクトをJSTの "YYYY.MM.DD SUN" 形式に変換する
 */
export const formatDateJST = (date: Date | null | undefined): string => {
    if (!date) return "---";
    try {
        // Intl.DateTimeFormat を使用してJSTに固定
        const formatter = new Intl.DateTimeFormat("en-US", {
            ...JST_OPTS,
            weekday: "short"
        });
        const parts = formatter.formatToParts(date);

        const y = parts.find(p => p.type === "year")?.value;
        const m = parts.find(p => p.type === "month")?.value;
        const d = parts.find(p => p.type === "day")?.value;
        const w = parts.find(p => p.type === "weekday")?.value.toUpperCase();

        return `${y}.${m}.${d} ${w}`;
    } catch (e) {
        console.error("Date formatting error:", e);
        return "---";
    }
};

/**
 * Dateオブジェクトから input[type="date"] 用の "YYYY-MM-DD" (JST) を生成
 */
export const toJSTDateInputValue = (date: Date): string => {
    const formatter = new Intl.DateTimeFormat("ja-JP", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const parts = formatter.formatToParts(date);
    const y = parts.find(p => p.type === "year")?.value;
    const m = parts.find(p => p.type === "month")?.value;
    const d = parts.find(p => p.type === "day")?.value;
    return `${y}-${m}-${d}`;
};

/**
 * Dateオブジェクトから input[type="datetime-local"] 用の "YYYY-MM-DDThh:mm" (JST) を生成
 */
export const toJSTDatetimeInputValue = (date: Date): string => {
    const formatter = new Intl.DateTimeFormat("ja-JP", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
    const parts = formatter.formatToParts(date);
    const y = parts.find(p => p.type === "year")?.value;
    const m = parts.find(p => p.type === "month")?.value;
    const d = parts.find(p => p.type === "day")?.value;
    const h = parts.find(p => p.type === "hour")?.value;
    const min = parts.find(p => p.type === "minute")?.value;

    return `${y}-${m}-${d}T${h}:${min}`;
};