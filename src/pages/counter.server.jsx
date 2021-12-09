import {getCounter} from '../counter';

export async function api({request}) {
  const counter = getCounter();

  if (!counter) {
    console.log('no counter available');
    return 0;
  }

  const obj = getObjectCounter(request);

  if (request.method === 'GET') {
    const url = new URL(request.url);
    const value = url.searchParams.get('value');
    await obj.fetch(new URL(`https://localhost:3000/set?value=${value}`));

    return new Response('OK Updated');
  }

  const res = await obj.fetch(new URL(`http://localhost:3000/increment`));
  const count = await res.text();

  return new Response(count);
}

function getObjectCounter(request, counter) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) throw new Error('You must provide an id.');

  const objId = counter.idFromName(id);
  return counter.get(objId);
}

/**
 * No-op to avoid warnings in console in `DefaultRoutes`
 */
export default function Counter() {
  return 'no-op';
}
