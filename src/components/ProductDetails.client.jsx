import {Product, Link} from '@shopify/hydrogen/client';

import Layout from './Layout.client';
import ProductOptions from './ProductOptions.client';
import Gallery from './Gallery.client';
import Seo from './Seo.client';

export default function ProductDetails({data}) {
  return (
    <Layout>
      <Seo product={data.product} />
      <Product
        product={data.product}
        initialVariantId={data.product.variants.edges[0].node.id}
      >
        <div className="py-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="md:hidden pb-4 flex justify-between items-top">
            <Product.Title as="h1" className="font-bold text-2xl" />
            <div className="flex items-center gap-1">
              <Product.SelectedVariant.Price className="text-xl" />
              <Product.SelectedVariant.CompareAtPrice className="line-through text-gray-400" />
            </div>
          </div>

          <section className="lg:col-span-2 grid gap-10" aria-label="Gallery">
            <Gallery />
          </section>

          <section
            className="my-4 md:my-0 max-w-md flex flex-col gap-6"
            aria-label="Product details"
          >
            {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
            <div>
              <Link
                to={`/products/${data.product.handle}`}
                className="hidden md:block"
              >
                <Product.Title className="text-gray-900 text-3xl font-medium" />
              </Link>
              <div className="my-4 gap-1 hidden md:block">
                <Product.SelectedVariant.Price className="font-semibold text-gray-900 text-2xl">
                  {({currencyCode, amount, currencyNarrowSymbol}) => {
                    return (
                      <span>{`${currencyCode} ${currencyNarrowSymbol}${amount}`}</span>
                    );
                  }}
                </Product.SelectedVariant.Price>
                <Product.SelectedVariant.CompareAtPrice className="text-gray-400 line-through text-xl">
                  {({amount, currencyNarrowSymbol}) => {
                    return <span>{`${currencyNarrowSymbol}${amount}`}</span>;
                  }}
                </Product.SelectedVariant.CompareAtPrice>
              </div>

              <ProductOptions />

              <div className="my-8 space-y-2">
                <Product.SelectedVariant.AddToCartButton className="rounded-md bg-gray-900 text-white text-center p-4 text-sm uppercase w-full">
                  Add to bag
                </Product.SelectedVariant.AddToCartButton>
                <Product.SelectedVariant.BuyNowButton className="rounded-md bg-white border border-black text-center p-4 text-sm uppercase w-full">
                  Buy it now
                </Product.SelectedVariant.BuyNowButton>
                <Product.SelectedVariant.ShopPayButton className="flex justify-center w-full" />
              </div>

              <Product.Description className="prose" />
            </div>
          </section>
        </div>
      </Product>
    </Layout>
  );
}
