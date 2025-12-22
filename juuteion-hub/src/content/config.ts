
import { defineCollection, z } from 'astro:content';

const eventCollection = defineCollection({
    type: 'content',
    // context引数を受け取り、imageヘルパーを使用
    schema: ({ image }) => z.object({
        title: z.string(),
        subTitle: z.string().optional(),
        date: z.date(),
        time: z.string(),
        place: z.string(),
        price: z.string(),

        // --- 画像設定の変更 ---
        // 詳細ページ用 (A版縦長)
        mainVisual: image(),
        // TOP/一覧用 (正方形)
        thumbnail: image(),
        // --------------------

        status: z.enum(['upcoming', 'archive', 'soldout']).default('archive'),
        address: z.string().optional(),
        mapEmbed: z.string().optional(),
    }),
});

export const collections = {
    'events': eventCollection,
};
