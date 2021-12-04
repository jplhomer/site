import {getCounter} from '../counter';

export async function api({request}) {
  if (request.method !== 'POST') {
    throw new Error('You must use a POST request.');
  }

  const counter = getCounter();

  if (!counter) {
    console.log('no counter available');
    return 0;
  }

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) throw new Error('You must provide an id.');

  const objId = counter.idFromName(id);
  const obj = counter.get(objId);
  const res = await obj.fetch(new URL(`http://localhost:3000/increment`));
  const count = await res.text();

  return new Response(count);
}
