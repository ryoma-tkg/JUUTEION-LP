import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://juuteion.club/',

  // ▼ 修正: prefetchAllを削除し、デフォルト設定（data-astro-prefetchが付いたもののみ）に戻す
  // これにより、意図しない大量通信を防ぎます
  prefetch: {
    defaultStrategy: 'viewport',
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