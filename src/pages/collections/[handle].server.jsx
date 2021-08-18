import {MediaFile, useShopQuery} from '@shopify/hydrogen';
import {useParams} from 'react-router-dom';
import gql from 'graphql-tag';

import Layout from '../../components/Layout.client';
import ProductCard from '../../components/ProductCard.client';

export default function Collection() {
  const {handle} = useParams();
  const {data} = useShopQuery({query: QUERY, variables: {handle}});

  const collection = data.collectionByHandle;

  return (
    <Layout>
      <h1 className="text-2xl font-bold">{collection.title}</h1>

      <ul className="grid lg:grid-cols-3 gap-6 mt-4">
        {collection.products.edges.map((edge) => (
          <li key={edge.node.id}>
            <ProductCard product={edge.node} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}

const QUERY = gql`
  fragment CollectionProductDetails on Product {
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
    media(first: 1) {
      edges {
        node {
          ...MediaFileFragment
        }
      }
    }
  }

  query CollectionDetails($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title

      products(first: 10) {
        edges {
          node {
            ...CollectionProductDetails
          }
        }
      }
    }
  }

  ${MediaFile.Fragment}
`;
