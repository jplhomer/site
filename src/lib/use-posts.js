import {useQuery} from 'react-query';

export function usePosts() {
  const posts = import.meta.glob('../posts/*.md');

  const {data} = useQuery('posts', async () => {
    return await Promise.all(
      Object.entries(posts).map(async ([filePath, mod]) => {
        const path = filePath
          .match(/\/posts\/(.+)\.md$/)[0]
          .replace(/\.md$/, '');
        const {html, attributes} = await mod();

        return {
          path,
          html,
          ...attributes,
        };
      }),
    );
  });

  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
}
