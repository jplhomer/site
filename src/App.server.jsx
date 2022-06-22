import {FileRoutes, Route, Router} from '@shopify/hydrogen';
import {Suspense} from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';

import NotFound from './components/NotFound.server';
import Layout from './components/Layout.client';
import LayoutFallback from './components/LayoutFallback';

function App({routes}) {
  return (
    <Suspense
      fallback={
        <LayoutFallback>
          <div className="text-center text-2xl min-h-screen">Loading...</div>
        </LayoutFallback>
      }
    >
      <Router>
        <Layout>
          <FileRoutes routes={routes} />
          <Route path="*" page={<NotFound />} />
        </Layout>
      </Router>
    </Suspense>
  );
}

export default renderHydrogen(App);
