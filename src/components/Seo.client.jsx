import {Helmet} from '@shopify/hydrogen/client';

export default function Seo({title, description}) {
  if (title || description) {
    return (
      <Helmet>
        <title>{title}</title>
        <meta property="description" content={description} />
      </Helmet>
    );
  }

  /**
   * Return a global SEO helper if no other props were passed.
   * Useful for placing in the "main" <App> container.
   */
  return (
    <Helmet defaultTitle="Josh Larson" titleTemplate="%s - Josh Larson">
      <html lang={lang} />
      <meta property="og:site_name" content="Josh Larson" />
    </Helmet>
  );
}
