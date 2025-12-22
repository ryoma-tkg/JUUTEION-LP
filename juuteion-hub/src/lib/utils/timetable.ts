/**
 * Markdownテキストからタイムテーブル情報を抽出する
 */
export interface TimetableItem {
    time: string;
    content: string;
}

export const extractTimetable = (markdown: string) => {
    const lines = markdown.split("\n");
    const timetable: TimetableItem[] = [];
    let cleanMarkdown = "";
    let isTimetableSection = false;

    for (const line of lines) {
        const trimmed = line.trim();

        // セクション開始判定
        if (trimmed.startsWith("## TIMETABLE")) {
            isTimetableSection = true;
            continue; // この行は本文に含めない
        }
        // 次のセクションが始まったら終了
        if (isTimetableSection && trimmed.startsWith("## ")) {
            isTimetableSection = false;
        }

        if (isTimetableSection) {
            // リストアイテムの解析: - **10:00** Content
            const match = trimmed.match(/^-\s*\*\*(.*?)\*\*\s*(.*)$/);
            if (match) {
                timetable.push({
                    time: match[1],
                    content: match[2],
                });
            }
        } else {
            // タイムテーブル以外の行はそのまま残す
            cleanMarkdown += line + "\n";
        }
    }

    return { timetable, cleanMarkdown };
};