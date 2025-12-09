import { defineCollection, z } from 'astro:content';

const eventCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        subTitle: z.string().optional(),
        date: z.date(),
        time: z.string(),
        place: z.string(),
        price: z.string(),
        image: z.string(),
        status: z.enum(['upcoming', 'archive', 'soldout']).default('archive'),
        // 追加: アクセス情報
        address: z.string().optional(),
        mapEmbed: z.string().optional(),
    }),
});

export const collections = {
    'events': eventCollection,
};