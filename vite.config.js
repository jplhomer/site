import {defineConfig} from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';
import mdPlugin from 'vite-plugin-markdown';
import hljs from 'highlight.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    hydrogen({}, {devCache: true}),
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
  build: process.env.WORKER
    ? {
        rollupOptions: {
          external: ['__STATIC_CONTENT_MANIFEST'],
          output: {
            format: 'es',
            entryFileNames: '[name].mjs',
          },
        },
      }
    : {},
});
