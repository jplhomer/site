import {defineConfig} from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';
import mdPlugin from 'vite-plugin-markdown';
import hljs from 'highlight.js';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tempApiMiddleware(),
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

/**
 * Hydrogen is going to support this `api` feature in the future.
 * For now, we short-circuit it here.
 */
function tempApiMiddleware() {
  return {
    name: 'temp-api-middleware',

    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (req.method !== 'POST') return next();

          const {getMatchingApiPage, respondWithMatchingApiPage} =
            await server.ssrLoadModule(
              path.resolve(__dirname, './src/framework/api.server.js'),
            );

          if (getMatchingApiPage(req)) {
            const response = await respondWithMatchingApiPage(req);

            res.statusCode = response.status;
            res.setHeader(
              'Content-Type',
              response.headers.get('content-type') ?? 'text/html',
            );
            res.end(await response.text());
            return next();
          }

          next();
        });
      };
    },
  };
}
