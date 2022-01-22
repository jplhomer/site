import renderHydrogen from '@shopify/hydrogen/entry-server';

import App from './App.server';

const pages = import.meta.globEager('./pages/**/*.server.(jsx|tsx)');

export default renderHydrogen(App, {shopifyConfig: {}, pages});
