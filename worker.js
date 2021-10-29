import handleEvent from '@shopify/hydrogen/worker';
import entrypoint from './src/entry-server.jsx';
// eslint-disable-next-line node/no-missing-import
import indexHtml from './dist/client/index.html?raw';
import mime from 'mime';

function createAssetHandler(env) {
  return async function assetHandler(_event, url) {
    // TODO: This doesn't work because we're missing an asset manifest.
    // This is a wrangler issue.
    console.log(`asset ${url}`);
    const assetUrl = new URL(url);
    const assetKey = assetUrl.pathname.slice(1);
    const mimeType = mime.getType(assetKey) || 'text/plain';

    console.log(`asset key ${assetKey}`);
    const body = await env.__STATIC_CONTENT.get(assetKey, 'arrayBuffer');
    const response = new Response(body);
    response.headers.set('Content-Type', mimeType);

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
          assetHandler: createAssetHandler(env),
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
