import {CacheLong, useQuery} from '@shopify/hydrogen';
import * as xml2js from 'xml2js';

export function useRafterPosts() {
  const {data: feed} = useQuery(
    'rafter-posts',
    async () => {
      const url = 'https://blog.rafter.app/rss.xml';
      const res = await fetch(url);
      const text = await res.text();
      const xml = await xml2js.parseStringPromise(text);
      const feed = xml.rss.channel[0].item;

      return feed.map((item) => ({
        title: item.title[0],
        url: item.link[0],
        date: item.pubDate[0],
        content: item['content:encoded'][0],
      }));
    },
    {
      cache: CacheLong(),
    },
  );

  return feed;
}
