const pages = import.meta.globEager('../pages/**/*.server.jsx');

export function getMatchingApiPage(request) {
  if (request.method === 'GET') return;

  const url = new URL(request.url, 'https://jplhomer.org');

  // TODO: Obviously need to take into account dynamic paths, etc.
  const matchingPage = Object.keys(pages).find((page) => {
    const match = page.match(/^\.\.\/pages\/(.+)\.server\.(?:j|t)sx?/)?.[1];

    return match === url.pathname.replace(/^\//, '');
  });

  if (!matchingPage) return;

  const page = pages[matchingPage];

  if (!page.api) return;

  return page;
}

export async function respondWithMatchingApiPage(request) {
  const matchingPage = getMatchingApiPage(request);

  const response = await matchingPage.api({request});

  if (response instanceof Response) {
    return response;
  }

  if (typeof response === 'object') {
    return new Response(JSON.stringify(response), {
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  return new Response(response);
}
