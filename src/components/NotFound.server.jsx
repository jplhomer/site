import {useRouteParams, Link} from '@shopify/hydrogen';
import ArchivePost from './ArchivePost.server';

import Wrapper from './Wrapper';

function mightBePost(slug) {
  return /^\/[0-9]{4}/.test(slug);
}

export default function NotFound() {
  const params = useRouteParams();

  if (mightBePost(params[0])) {
    return <ArchivePost slug={params[0]} />;
  }

  return (
    <Wrapper>
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
    </Wrapper>
  );
}
