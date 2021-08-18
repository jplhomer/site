import {
  ProductProvider,
  SelectedVariantImage,
  ProductTitle,
  SelectedVariantPrice,
  SelectedVariantCompareAtPrice,
  SelectedVariantAddToCartButton,
  Link,
} from '@shopify/hydrogen/client';

import ProductOptions from './ProductOptions.client';

export default function HighlightedProduct({product}) {
  if (!product) {
    return null;
  }

  return (
    <ProductProvider
      product={product}
      initialVariantId={product.variants.edges[0].node.id}
    >
      <SelectedVariantImage className="rounded-md bg-gray-100 w-full md:min-h-96 md:w-96 object-cover" />
      <div className="pt-4 md:pl-10 w-full flex flex-col">
        <Link to={`/products/${product.handle}`}>
          <ProductTitle className="text-gray-900 text-xl md:text-3xl font-medium" />
        </Link>
        <div className="my-2 md:my-4 md:mb-16">
          <SelectedVariantPrice className="font-semibold md:font-medium text-gray-900 md:text-xl">
            {({currencyCode, amount, currencyNarrowSymbol}) => {
              return (
                <span>{`${currencyCode} ${currencyNarrowSymbol}${amount}`}</span>
              );
            }}
          </SelectedVariantPrice>
          <SelectedVariantCompareAtPrice className="text-gray-400 line-through md:text-xl">
            {({amount, currencyNarrowSymbol}) => {
              return <span>{`${currencyNarrowSymbol}${amount}`}</span>;
            }}
          </SelectedVariantCompareAtPrice>
        </div>
        <ProductOptions />
        <SelectedVariantAddToCartButton className="rounded-md bg-gray-900 text-white text-center p-4 text-sm uppercase w-full mt-4 mb-2">
          Add to bag
        </SelectedVariantAddToCartButton>
        <p className="text-gray-500 text-xs text-center">
          Free shipping and 30 day returns
        </p>
      </div>
    </ProductProvider>
  );
}
