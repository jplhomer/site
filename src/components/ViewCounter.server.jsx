import {Suspense} from 'react';
import {useQuery} from '@shopify/hydrogen';
import {getCounter} from '../counter';
import ViewCounterClient from './ViewCounter.client';

export default function ViewCounter({id, shouldIncrement = false}) {
  return (
    <Suspense fallback="...">
      <ViewsFor id={id} shouldIncrement={shouldIncrement} />
    </Suspense>
  );
}

function ViewsFor({id, shouldIncrement}) {
  const {data: views} = useQuery(
    `views-${id}`,
    async () => {
      const counter = getCounter();

      if (!counter) {
        console.log('no counter available');
        return 0;
      }

      const objId = counter.idFromName(id);
      const obj = counter.get(objId);
      const url = new URL(`http://localhost:3000/`);
      const res = await obj.fetch(url);
      const count = await res.text();

      return count;
    },
    {
      cache: {
        maxAge: 4,
        staleWhileRevalidate: 10,
      },
    },
  );

  return (
    <ViewCounterClient
      id={id}
      views={views}
      shouldIncrement={shouldIncrement}
    />
  );
}
