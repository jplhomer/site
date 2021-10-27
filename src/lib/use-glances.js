import {useQuery} from '@shopify/hydrogen';

export function useGlances() {
  const glances = import.meta.glob('../glances/*.md');

  const {data} = useQuery('glances', async () => {
    return await Promise.all(
      Object.entries(glances).map(async ([filePath, mod]) => {
        const path = filePath
          .match(/\/glances\/(.+)\.md$/)[0]
          .replace(/\.md$/, '');
        const glance = await getGlance(await mod());

        return {
          path,
          ...glance,
        };
      }),
    );
  });

  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getGlance(markdownModule) {
  const {html, attributes} = markdownModule;

  return {
    html,
    ...attributes,
    image: await getImage(attributes),
  };
}

async function getImage(glance) {
  if (glance.image) return glance.image;

  if (glance.video) {
    if (glance.video.includes('youtube.com')) {
      const id = new URL(glance.video).searchParams.get('v');
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    }

    if (glance.video.includes('vimeo')) {
      const id = new URL(glance.video).pathname.replace(/^\//, '');

      try {
        const res = await fetch(`https://vimeo.com/api/v2/video/${id}.json`);
        const data = await res.json();

        return data[0].thumbnail_large;
      } catch (e) {
        return '';
      }
    }
  }
}
