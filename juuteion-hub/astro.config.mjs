import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://juuteion.club/', // ← あなたの公開URLに書き換えてください

  // ▼▼▼ 追加: これを入れるだけで、リンクの先読みが有効になり遷移が爆速になります ▼▼▼
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport', // 画面に入ったリンクを自動で読み込む設定
  },

  integrations: [tailwind()],
  vite: {
    server: {
      fs: {
        allow: ['..']
      }
    }
  }
});