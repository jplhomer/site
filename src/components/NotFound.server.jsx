import {useShopQuery, MediaFile} from '@shopify/hydrogen';
import {Link} from '@shopify/hydrogen/client';
import gql from 'graphql-tag';

import Layout from './Layout.client';
import ProductCard from './ProductCard.client';

export default function NotFound() {
  const {data} = useShopQuery({query: QUERY});
  const {products} = data;

  return (
    <Layout>
      <div className="text-center py-10 md:py-40 max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold leading-tight">
          We’ve lost this page
        </h1>
        <p className="text-xl text-gray-500">
          We couldn’t find the page you’re looking for. Try checking the URL or
          heading back to the home page.
        </p>
        <Link
          className="block max-w-md mx-auto text-white p-3 rounded mb-8 uppercase text-lg bg-black"
          to="/"
        >
          Take me to the home page
        </Link>
      </div>

      <hr className="border-gray-300" />

      <h2 className="my-8 text-2xl text-gray-700 font-bold">
        Products you might like
      </h2>

      <ul className="grid lg:grid-cols-3 gap-6 my-4">
        {products.edges.map((edge) => (
          <li key={edge.node.id}>
            <ProductCard product={edge.node} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}

const QUERY = gql`
  fragment NotFoundProductDetails on Product {
    id
    title
    handle
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 1) {
      edges {
        node {
          priceV2 {
            currencyCode
            amount
          }
          compareAtPriceV2 {
            currencyCode
            amount
          }
          image {
            ...ImageFragment
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    media(first: 1) {
      edges {
        node {
          ...MediaFileFragment
        }
      }
    }
  }

  query Products {
    products(first: 3) {
      edges {
        node {
          id
          ...NotFoundProductDetails
        }
      }
    }
  }

  ${MediaFile.Fragment}
`;
