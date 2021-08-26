import {defineConfig} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import hydrogen from '@shopify/hydrogen/plugin';
import mdPlugin from 'vite-plugin-markdown';
import hljs from 'highlight.js';

import shopifyConfig from './shopify.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    hydrogen(shopifyConfig),
    reactRefresh(),
    mdPlugin({
      markdownIt: {
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(str, {language: lang}).value;
            } catch (__) {}
          }

          return ''; // use external default escaping
        },
      },
      mode: 'html',
    }),
  ],
  resolve: {
    // This is a shitshow and breaks things. Comment out for now.
    // alias: [{find: /@\/(.+)$/, replacement: path.join(__dirname, './src/$1')}],
  },
  optimizeDeps: {
    include: ['@heroicons/react/solid', '@heroicons/react/outline'],
  },
  ssr: {
    noExternal: process.env.WORKER
      ? ['@cloudflare/kv-asset-handler', '@heroicons/react', 'xml2js']
      : [],
  },
});
