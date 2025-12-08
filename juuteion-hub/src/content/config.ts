import { defineCollection, z } from 'astro:content';

const eventCollection = defineCollection({
    type: 'content',
    schema: z.object({
        // イベント名（例: Deep Night）
        title: z.string(),
        // サブタイトル（例: Vol.1 Launch）- ない場合もあるので optional
        subTitle: z.string().optional(),
        // 日付（ソート用）YYYY-MM-DD 形式で記述
        date: z.date(),
        // 時間表示（例: OPEN 23:00）
        time: z.string(),
        // 場所（例: CLUB ASIA）
        place: z.string(),
        // 価格（例: ¥3,500 / 1D）
        price: z.string(),
        // 画像パス（publicフォルダのパス または URL）
        image: z.string(),
        // ステータス（今後: 最新upcoming / 過去archive / 完売soldout などで制御可能に）
        status: z.enum(['upcoming', 'archive', 'soldout']).default('archive'),
    }),
});

export const collections = {
    'events': eventCollection,
};