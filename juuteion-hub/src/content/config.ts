import { defineCollection, z } from 'astro:content';

const eventCollection = defineCollection({
    type: 'content',
    schema: z.object({
        // イベント名
        title: z.string(),
        subTitle: z.string().optional(),
        // 日付・時間・場所・価格
        date: z.date(),
        time: z.string(),
        place: z.string(),
        price: z.string(),
        // 画像
        image: z.string(),
        // ステータス
        status: z.enum(['upcoming', 'archive', 'soldout']).default('archive'),
        // 【追加】 アクセス情報
        address: z.string().optional(), // 住所テキスト
        mapEmbed: z.string().optional(), // Google Maps埋め込みURL
    }),
});

export const collections = {
    'events': eventCollection,
};