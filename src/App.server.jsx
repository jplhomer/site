import {DefaultRoutes} from '@shopify/hydrogen';
import {Suspense} from 'react';

import NotFound from './components/NotFound.server';
import Layout from './components/Layout.client';
import AppClient from './App.client';

export default function App({...serverState}) {
  return (
    <Suspense
      fallback={
        <Layout>
          <div className="text-center text-2xl min-h-screen">Loading...</div>
        </Layout>
      }
    >
      <AppClient helmetContext={serverState.helmetContext}>
        <Layout>
          <DefaultRoutes
            pages={serverState.pages}
            serverState={serverState}
            fallback={<NotFound />}
          />
        </Layout>
      </AppClient>
    </Suspense>
  );
}
