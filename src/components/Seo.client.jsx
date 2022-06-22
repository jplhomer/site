import {Head} from '@shopify/hydrogen';

export default function Seo({title, description}) {
  if (title || description) {
    return (
      <Head>
        <title>{title}</title>
        <meta property="description" content={description} />
      </Head>
    );
  }

  /**
   * Return a global SEO helper if no other props were passed.
   * Useful for placing in the "main" <App> container.
   */
  return (
    <Head defaultTitle="Josh Larson" titleTemplate="%s - Josh Larson">
      <html lang={lang} />
      <meta property="og:site_name" content="Josh Larson" />
    </Head>
  );
}
