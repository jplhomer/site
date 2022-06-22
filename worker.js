import handleRequest from './src/App.server';
// eslint-disable-next-line node/no-missing-import
import indexHtml from './dist/client/index.html?raw';
import {getAssetFromKV} from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';
import {setCounter} from './src/counter.js';
const assetManifest = JSON.parse(manifestJSON);

async function handleAsset(request, env, context, url) {
  /**
   * A somewhat clunky workaround for asset fetching for Cloudflare Workers Sites with module syntax.
   * Cloudflare introduced a way better way to do this with `env.assets` with Pages `_worker.js` outputs.
   */
  try {
    const response = await getAssetFromKV(
      {
        request,
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
  } catch (e) {
    // Do nothing
  }
}

export default {
  async fetch(request, env, context) {
    // Rewrite any incoming requests to https://jplhomer.org to https://www.jplhomer.org
    if (request.url.startsWith('https://jplhomer.org')) {
      return new Response('Redirecting', {
        status: 301,
        headers: {
          location: 'https://www.jplhomer.org',
        },
      });
    }

    setCounter(env.COUNTER);

    const url = new URL(request.url);

    try {
      return (
        (await handleAsset(request, env, context, url)) ??
        handleRequest(request, {
          indexTemplate: indexHtml,
          cache: caches.default,
          context,
        })
      );
    } catch (error) {
      return new Response(error.message || error.toString(), {
        status: 500,
      });
    }
  },
};

/**
 * An exact copy of Cloudflare's `Counter` example.
 */
export class Counter {
  constructor(state, env) {
    this.state = state;
    // `blockConcurrencyWhile()` ensures no requests are delivered until
    // initialization completes.
    this.state.blockConcurrencyWhile(async () => {
      let stored = await this.state.storage.get('value');
      this.value = stored || 0;
    });
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // Apply requested action.
    let url = new URL(request.url);
    let currentValue = this.value;
    switch (url.pathname) {
      case '/increment':
        currentValue = ++this.value;
        await this.state.storage.put('value', this.value);
        break;
      case '/decrement':
        currentValue = --this.value;
        await this.state.storage.put('value', this.value);
        break;
      case '/':
        // Just serve the current value. No storage calls needed!
        break;
      default:
        return new Response('Not found', {status: 404});
    }

    // Return `currentValue`. Note that `this.value` may have been
    // incremented or decremented by a concurrent request when we
    // yielded the event loop to `await` the `storage.put` above!
    // That's why we stored the counter value created by this
    // request in `currentValue` before we used `await`.
    return new Response(currentValue);
  }
}
