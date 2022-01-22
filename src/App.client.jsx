import {HelmetProvider} from '@shopify/hydrogen/client';

export default function ClientApp({helmetContext, children}) {
  return (
    <HelmetProvider helmetContext={helmetContext}>{children}</HelmetProvider>
  );
}
