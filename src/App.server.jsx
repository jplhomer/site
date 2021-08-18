import {ShopifyServerProvider, DefaultRoutes} from '@shopify/hydrogen';
import {Switch} from 'react-router-dom';
import {Suspense} from 'react';

import shopifyConfig from '../shopify.config';

import NotFound from './components/NotFound.server';
import Layout from './components/Layout.client';

export default function App({...serverState}) {
  const pages = import.meta.globEager('./pages/**/*.server.(jsx|tsx)');

  return (
    <ShopifyServerProvider shopifyConfig={shopifyConfig} {...serverState}>
      <Suspense fallback="Loading...">
        <Layout>
          <Switch>
            <DefaultRoutes
              pages={pages}
              serverState={serverState}
              fallback={<NotFound />}
            />
          </Switch>
        </Layout>
      </Suspense>
    </ShopifyServerProvider>
  );
}
