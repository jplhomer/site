import handleEvent from '@shopify/hydrogen/worker';
import entrypoint from './src/entry-server.jsx';
// eslint-disable-next-line node/no-missing-import
import indexHtml from './dist/client/index.html?raw';
import {getAssetFromKV} from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';
const assetManifest = JSON.parse(manifestJSON);

function createAssetHandler(env, context) {
  return async function assetHandler(event, url) {
    const response = await getAssetFromKV(
      {
        request: event.request,
        waitUntil(promise) {
          return context.waitUntil(promise);
        },
      },
      {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: assetManifest,
      },
    );

    if (response.status < 400) {
      const filename = url.pathname.split('/').pop();

      const maxAge =
        filename.split('.').length > 2
          ? 31536000 // hashed asset, will never be updated
          : 86400; // favico and other public assets

      response.headers.append('cache-control', `public, max-age=${maxAge}`);
    }

    return response;
  };
}

export default {
  async fetch(request, env, context) {
    try {
      return await handleEvent(
        {request},
        {
          entrypoint,
          indexTemplate: indexHtml,
          assetHandler: createAssetHandler(env, context),
          cache: caches.default,
        },
      );
    } catch (error) {
      return new Response(error.message || error.toString(), {
        status: 500,
      });
    }
  },
};
