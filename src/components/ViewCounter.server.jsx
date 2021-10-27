import {Suspense} from 'react';
import {useQuery} from '@shopify/hydrogen';

export default function ViewCounter({id}) {
  return (
    <Suspense fallback="...">
      <ViewsFor id={id} />
    </Suspense>
  );
}

function ViewsFor({id}) {
  const {data: views} = useQuery(
    `views-${id}`,
    async () => await new Promise((res) => setTimeout(() => res(10), 1000)),
  );

  const label = views === 1 ? 'view' : 'views';

  return (
    <span className="text-gray-600 dark:text-gray-200 text-sm">
      {views} {label}
    </span>
  );
}
