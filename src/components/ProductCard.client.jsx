import {
  Link,
  ProductProvider,
  ProductTitle,
  SelectedVariantImage,
  SelectedVariantPrice,
  SelectedVariantCompareAtPrice,
} from '@shopify/hydrogen/client';

export default function ProductCard({product}) {
  const firstVariant = product?.variants?.edges[0]?.node;

  if (!product) return null;

  return (
    <ProductProvider product={product} initialVariantId={firstVariant.id}>
      <Link to={`/products/${product.handle}`}>
        <SelectedVariantImage className="rounded-md bg-gray-100 h-80 w-96 mb-2" />
        <ProductTitle className="text-gray-900 font-medium" />
      </Link>
      <div className="flex items-center">
        <SelectedVariantPrice className="text-gray-900">
          {({currencyCode, amount, currencyNarrowSymbol}) => {
            return (
              <span>{`${currencyCode} ${currencyNarrowSymbol}${amount}`}</span>
            );
          }}
        </SelectedVariantPrice>
        <SelectedVariantCompareAtPrice className="text-gray-400 line-through">
          {({amount, currencyNarrowSymbol}) => {
            return <span>{`${currencyNarrowSymbol}${amount}`}</span>;
          }}
        </SelectedVariantCompareAtPrice>
      </div>
    </ProductProvider>
  );
}
