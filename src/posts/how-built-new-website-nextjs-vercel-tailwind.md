---
title: Building my new website with Next.js, TailwindCSS, and Vercel
date: 2020-05-30
description: I talk about building my new website with some fun new technologies.
---

For the first time in a decade, I finally updated my personal website. This is something I've wanted to do for a long time, but I never gotten around to it until now.

The site is built with [Next.js](https://nextjs.org) and [TailwindCSS](https://tailwindcss.com), and it's hosted on [Vercel](https://vercel.com). You can [view the source code on GitHub](https://github.com/jplhomer/site).

## Table of Contents

## Goals

I set some goals when beginning the redesign process:

- Build something modern and fast, e.g. React or Next.js
- Preserve the ~100 blog posts I had on my old WordPress site
- Consolidate my newer blog posts into a single place
- Share the writing I've been doing on other side project sites
- Highlight the side projects I work on

## Importing WordPress posts into Next.js

_Sigh_.

I started my old WordPress site in 2008 when I was a freshman in college. I literally bought a cheap desktop computer from Walmart, set it up in my dorm room because it had high-speed internet, asked the IT department for a static IP address, and hosted a WordPress blog from my computer.

There's a lot of nostalgia there. I've written [lots of posts](/archives) over the past twelve years, and WordPress has served me well. I didn't want to give up the ghost quite yet and move to a completely-static site, so I made the decision to **preserve the site** and import the posts using the WordPress REST API.

Luckily, Next's [static-site generation (SSG)](https://nextjs.org/docs/basic-features/data-fetching) APIs made this a breeze!

I wanted to **keep the same URL structure** for SEO purposes:

`/2018/06/i-created-an-educational-site-called-full-stack-fundamentals`

This can be tricky, since a traditional dynamic route might look more like:

`/posts/[slug]`

However, Next provides [catch-all routes](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes) to make this possible. First, I added a new page named `pages/[...slug].js`. This meant an incoming request with the above URL will be parsed by Next into an array of params:

```js
['2018', '06', 'i-created-an-educational-site-called-full-stack-fundamentals'];
```

In order to fetch the requested post, I leveraged the `getStaticProps` method. WordPress allows you to query by `slug` alone without the leading date prefix. To do this, I grabbed the last item in the `params` array to send off to the JSON endpoint:

```js
// pages/[...slug].js

export async function getStaticProps({params}) {
  const res = await fetch(
    `https://archive.jplhomer.org/wp-json/wp/v2/posts?slug=${params.slug[2]}`,
  );
  const posts = await res.json();
  const post = posts[0];

  return {
    props: {
      post,
    },
  };
}
```

Additionally, I needed to define a `getStaticPaths` method to tell Next how to pre-render the incoming static pages. In order to save some time during the build process, I chose to build only the **first ten** posts and then allowed the remainder to be generated at runtime;

```js
// pages/[...slug].js

export async function getStaticPaths() {
  const {posts} = await getArchivePosts(10);
  const paths = posts.map((post) => ({
    params: {
      slug: post.nextSlug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
```

Finally, I wanted to support **paginated archives** for my posts. To do that, I added a new dynamic route `pages/archives/[page].js`:

```js
// pages/archives/[pages].js

export async function getStaticPaths() {
  const paths = [1, 2, 3].map((page) => ({params: {page: String(page)}}));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({params}) {
  const {page} = params;
  const {posts, total} = await getArchivePosts(
    PER_PAGE,
    PER_PAGE * (Number(page) - 1),
  );

  return {
    props: {
      page: Number(page),
      posts,
      total,
    },
  };
}
```

This creates **three initial archive pages** and allows the rest to be generated at runtime. I also pass the `page` and `total` props down to the component so I can render pagination UI.

## Blogging with MDX

Although I'm still importing my old WordPress posts via a JSON API, I want to write all future posts with [MDX](https://mdxjs.com/). It's like [Markdown](https://daringfireball.net/projects/markdown/syntax), only super-powered with React capabilities.

Useing this exactly how I wanted proved to be a bit of a challenge.

On one hand, you have the [official Next.js MDX plugin](https://github.com/vercel/next.js/tree/master/packages/next-mdx). This is great if you want to simply import partials of Markdown:

```jsx
import Content from './content.mdx';

export default function Page() {
  return <Content />;
}
```

The downside with this approach is that it's difficult to combine the power of `getStaticProps` with the MDX files, because the MDX compilation happens at the Webpack level.

You can also enable top-level pages like `pages/content.mdx` if you want. Unfortunately, you're stuck with whatever global layout your app is providing, making it difficult to add custom layout features or pull in frontmatter metadata like `title`.

_Also: I had no idea MDX didn't support frontmatter out of the box. Kind of a disappointed that I needed to pull in a separate package for this._

Apparently [next-mdx-enhanced](https://github.com/hashicorp/next-mdx-enhanced/) is a nice alternative, but I just couldn't get past a weird compile error 😞.

So I rolled with my own strategy!

For "dynamic" content like blog posts, I followed the ["Do It Yourself"](https://mdxjs.com/getting-started#do-it-yourself) guide on the MDX website and made it a simple `renderToMdx` server-side module on my site.

Then, I used the `fs` package to iterate through the `/posts` directory in my project to parse the Markdown and MDX files. I used the `front-matter` package to strip out the frontmatter and provide it in the output.

```js
import {promises as fs} from 'fs';
import path from 'path';
import frontmatter from 'front-matter';
import {renderMdx} from './mdx';

const POSTS_PATH = path.resolve(process.cwd(), 'posts');

export async function getPost(postPath, withBody = false) {
  const content = await fs.readFile(
    path.resolve(POSTS_PATH, postPath),
    'utf-8',
  );
  const {attributes, body} = frontmatter(content);
  const bodyOutput = withBody ? await renderMdx(body) : '';

  // Next.js complains if a legit Date object gets passed through
  attributes.date = attributes.date.toString();

  return {
    path: postPath,
    body: bodyOutput,
    nextPath: postPath.replace(/.mdx?/, ''),
    ...attributes,
  };
}

export async function getPosts() {
  const paths = await fs.readdir(POSTS_PATH);

  const posts = await Promise.all(
    paths.map(async (path) => {
      return await getPost(path);
    }),
  );

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getFilenameFromSlug(slug) {
  const paths = await fs.readdir(POSTS_PATH);

  return paths.find((p) => new RegExp(slug).test(p));
}
```

You can [view my `mdx.js` file](https://github.com/jplhomer/site/blob/master/lib/mdx.js) to see how `renderMdx` was implemented.

::: warning Heads up!
Since this method is totally separate from the Webpack build process, custom imports are not
supported in the individual MDX files. They need to be passed into the <code>MDXProvider</code>'s components object to
be accessible. This is kind of gross, and I try to work around it as much as possible.
:::

For "partials," I ended up using the official `@next/mdx` plugin for this 👍.

## Generating A Sitemap and RSS Feed

If you're optimizing for SEO, it's a good idea to maintain a `sitemap.xml` file to submit to search engine crawlers.

Also, if you're writing a blog, people love to have RSS feeds like `rss-feed.xml` of your content so they can aggregate it into their readers.

Turns out, both of these things are **manual** processes in Next.js.

In a [discussion on GitHub](https://github.com/vercel/next.js/issues/9051#issuecomment-597078126) about this very topic, Lee Robinson proposes using `getServerSideProps` for generating a sitemap. Looks really slick!

I ended up merging my MDX posts and WordPress posts together like this:

```js
import {getPosts} from '@/lib/posts';
import {getArchivePosts} from '@/lib/archive-posts';

export async function getServerSideProps({res}) {
  const posts = await getPosts();
  const {posts: archivePosts} = await getArchivePosts();
  const allPosts = posts
    .concat(archivePosts)
    .filter((post) => !post.externalUrl);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPosts
        .map((post) => {
          return `
                  <url>
                      <loc>${`https://jplhomer.org/${post.nextPath}`}</loc>
                  </url>
              `;
        })
        .join('')}
  </urlset>
`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}

export default function Sitemap() {
  return '';
}
```

This **worked fine locally** but failed once I deployed to Vercel.

Why? Because apparently **`getServerSideProps` and API routes do NOT have access to the filesystem** like `getStaticProps`. This is a bummer.

I ended up borrowing [Lee's method](https://github.com/leerob/leerob.io/blob/master/scripts/generate-sitemap.js) of generating the sitemap manually during the Webpack build step.

Big downsides of this include the fact that I can't import the same helper libraries I'm using in my Next pages because they are written in ES Modules, and the sitemap generator script is limited to CommonJS. 😭

Here's my [finished script](https://github.com/jplhomer/site/blob/master/scripts/generate-sitemap.js) which creates both a sitemap and an RSS feed.

## Building Glances

A really cool part about the new site is a section I've named [**Glances**](/glances) 😍:

<video src="/blog/glances_desktop.mp4" autoplay="true" loading="lazy" muted controls playsinline loop></video>

This is sort of like a **self-hosted Instagram**. I realized I share lots of different photos and videos to different social media platforms, but there's not really a single place where the "highlights" live.

Glances are driven by Markdown files in a `/glances` folder:

```md
---
date: 2020-01-07
image: 'https://some.photo.com/here.jpg'
---

My son Barrett was born! He is five days old in this photo.
```

These are pulled in once again using `getStaticProps` and parsed using `front-matter` and `marked`.

One cool thing to note about glances is the **modal routing support**. You might be familiar with this if you've used Instagram:

- **When clicking on a post**, it loads in a modal
- **When visiting a post or refreshing the page**, it loads in a dedicated page.

How the heck does that work? There's a [neat example](https://github.com/vercel/next.js/tree/canary/examples/with-route-as-modal) in the official repo. Here are the key parts I used in Glances:

```jsx
export default function Glances({glances}) {
  return glances.map((glance) => (
    <Link
      key={glance.slug}
      href={`/glances?glanceSlug=${glance.slug}`}
      as={`/glances/${glance.slug}`}
      shallow={true}
    >
      <a>
        <GlancePreview glance={glance} />
      </a>
    </Link>
  ));
}
```

The key part is the variation between the `href` and `as` attributes. Under the hood, Next navigates to a query string like `?glanceSlug=some-glance-slug`. But in the URL bar, it looks as though you've completely changed routes to `/glances/some-glance/slug`.

Then I can add a `pages/glances/[slug].js` which can pull in the slug, load the glance, and pre-render the static paths of all the glances ahead of time.

::: warning Uh-oh!
One issue I ran into here was the fact that as soon as I would change a route query param, I would lose my `glances` static props. This is because the entire component was being re-rendered, and no pre-defined props existed for that specific combination of page + query string.

The key thing to remember is to add `shallow={true}` to the route to ensure the component isn't re-rendered.
:::

### Hearts

Because I thought it would be fun, I wanted to add Instagram-style "likes" to my photos using a heart icon.

First, I leveraged a [useLocalStorage](https://usehooks.com/useLocalStorage) hook to sync a given user's "like" status for a glance. I wrapped all of this functionality into my own hook, `useHearts`:

```js
import {useLocalStorage} from './use-localstorage';
import {useMemo} from 'react';

export function useHearts(slug, callback) {
  const [glances, setGlances] = useLocalStorage('glance-likes', []);

  const isLiked = useMemo(() => glances.includes(slug), [glances, slug]);

  function toggleLike() {
    if (isLiked) {
      const newGlances = glances.filter((s) => s !== slug);

      setGlances(newGlances);

      if (callback) callback(-1);
    } else {
      let newGlances = [...glances];
      newGlances.push(slug);

      setGlances(newGlances);
      if (callback) callback(1);
    }
  }

  return [isLiked, toggleLike];
}
```

Then I can pull in the user's like status:

```js
const [isLiked, toggleLiked] = useHearts(glance.slug);
```

That took care of tracking likes _locally_, but I also wanted to persist a total count of likes _remotely_. This is where [Firebase](https://firebase.google.com) came in handy, based on a [Jamstack Functions](https://jamstackfns.com/f/firebase) recipe by Lee Robinson.

I leveraged Next's [API Routes](https://nextjs.org/docs/api-routes/introduction) to add a `pages/api/toggle-glance-like.js` endpoint:

```js
import db from '@/lib/db-admin';

export default async (req, res) => {
  if (!req.method === 'POST') {
    return res.status(400).json({
      error: 'Only supported request method is POST',
    });
  }

  if (!req.body.slug) {
    return res.status(400).json({
      error: 'Missing "slug" body parameter',
    });
  }

  const delta = req.body.decrement ? -1 : 1;

  const ref = db.ref('glance-likes').child(req.body.slug);

  const {snapshot} = await ref.transaction((currentLikes) => {
    if (currentLikes === null || currentLikes === 0) {
      return Math.max(delta, 0);
    }

    return currentLikes + delta;
  });

  return res.status(200).json({
    total: snapshot.val(),
  });
};
```

Now, whenever the user clicks the heart (or double taps the photo), I `POST` to that endpoint to toggle the like within Firebase.

Finally, I wanted to show the total number of likes for a given glance. I added a handy `useFirebase` hook which let me display realtime data from a given table:

```js
import {useState, useEffect} from 'react';
import loadDb from '@/lib/db';

export function useFirebase(collection, documentId) {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const handleValue = (snapshot) => {
      setValue(snapshot.val());
      setLoading(false);
    };

    let db;

    async function fetchValue() {
      db = await loadDb();
      db.ref(collection).child(documentId).on('value', handleValue);
    }

    fetchValue();

    return () => {
      if (db) {
        db.ref(collection).child(documentId).off('value', handleValue);
      }
    };
  });

  return [value, loading, setValue];
}
```

I'm using it like this:

```js
const [totalLikes, likesLoading, setTotalLikes] = useFirebase(
  'glance-likes',
  glance.slug,
);
```

A couple things to note here:

- **Asynchronous imports**. I got some nasty Firebase initialization errors when trying to do this otherwise. _This fix, once again, is thanks to Lee Robinson_.
- **Optional setter**. I export a `setValue` optional third param, even though it only sets internal state. Why? Because it's nice to have _optimistic UI responses_ to an action like clicking the heart on a glance and seeing the number increment immediately. The total will be eventually consistent with the remote UI, because the Firebase event will eventually callback with the real total.

::: warning A note about private keys
When adding my `FIREBASE_PRIVATE_KEY` to Vercel, I was getting an internal server error on the API endpoint along with a "Invalid PEM" message. This is because Vercel was **cutting off the first part of the private key** when I added the value through the Environment Variable UI. Adding the value directly from the CLI did the trick for me. I'm guessing this is a bug, and it should be fixed eventually.
:::

### Glance Navigation

I really wanted to polish the UX for glances, so I implemented **keyboard arrow navigation** support on desktop using a hook called `useKeyboard`:

```js
import {useEffect} from 'react';

export function useKeyboard(key, callback) {
  useEffect(() => {
    /**
     * @param {KeyboardEvent} e
     */
    const handler = (e) => {
      if (e.key === key) callback();

      return;
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  });
}
```

Then I can pass a callback to switch the active glance in the route query params:

```js
useKeyboard('ArrowRight', () => navigateGlance());
useKeyboard('ArrowLeft', () => navigateGlance(-1));
```

Instagram's mobile interface is different than their desktop interface, and I wanted to reflect that here as well.

On mobile, Instagram sends you to what _looks like_ a detail screen, but it's really a long list of chronological posts that you can view by simply scrolling up or down on the page.

To implement this, I added a different query param `?glanceSlugScroll`, which allowed me to determine **which view to display** to the user based on a `useMedia` media query hook:

```js
const glanceLinkParam = useMedia(
  ['(min-width: 768px)'],
  ['glanceSlug'],
  'glanceSlugScroll',
);
```

When a mobile user clicks on a post, I set the `glanceScrollSlug` query param, and then scroll them to that position on the page (using a slight delay to allow for some loading):

```jsx
export default function Glances({glances}) {
  const isScrollActive = Boolean(router.query.glanceSlugScroll);

  // ...

  useEffect(() => {
    if (router.query.glanceSlugScroll) {
      const item = document.getElementById(router.query.glanceSlugScroll);
      setTimeout(() => scroll(0, item.offsetTop), 100);
    }
  }, [router.query.glanceSlugScroll]);

  return isScrollActive ? (
    <ul>
      {glances.map((glance) => (
        <li id={glance.slug} key={glance.slug}>
          <Glance glance={glance} />
        </li>
      ))}
    </ul>
  ) : (
    <div>
      {glances.map((glance) => (
        <Link
          key={glance.slug}
          href={`/glances?${glanceLinkParam}=${glance.slug}`}
          as={`/glances/${glance.slug}`}
          shallow={true}
        >
          <a>
            <GlancePreview glance={glance} />
          </a>
        </Link>
      ))}
    </div>
  );
}
```

It isn't _perfect_, but it works nicely enough.

## Dark Mode

Gosh, Dark Mode sure is all the rage right now, isn't it?

I _almost_ didn't ship this, because I assumed it would be a ton of work. But it wasn't, and I was pleasantly surprised!

This is in large part thanks to a couple packages:

- [tailwind-css-mode](https://github.com/ChanceArthur/tailwindcss-dark-mode) by Chance Arthur
- [use-dark-mode](https://github.com/donavon/use-dark-mode) by donavon

Once I added the Tailwind plugin, I wired up the the `useDarkMode` hook to the sun/moon icon in my header:

```jsx
function DarkModeToggle() {
  const darkMode = useDarkMode();
  const isClient = useIsClient();

  const iconClasses = 'w-5 h-5 inline-block';

  if (isClient) {
    return (
      <button onClick={darkMode.toggle} aria-label="Toggle light and dark mode">
        {darkMode.value ? (
          <Lightbulb className={iconClasses} />
        ) : (
          <Moon className={iconClasses} />
        )}
      </button>
    );
  }

  return <span className="p-2 ml-2">...</span>;
}
```

The last step was to apply dark-only styles to my site using the Tailwind helper classes e.g. `dark:bg-gray-800`. It was a lot fewer than I was expecting!

The dark mode hook should use your system and browser preferences by default, which is _freaking amazing_. So you should see my "light mode" site during the day, and my "dark mode" site at night — unless you explicitly set the toggle, at which point it gets persisted in your localStorage.

## Hosting

The site is hosted on [Vercel](https://vercel.com). It's easy. It's fast.

Every branch and commit I push to GitHub automatically gets a unique URL to preview in-browser.

Plus, it's integrated tightly with the Next.js framework (built by Vercel) so my static-generated pages get hoisted to the CDN edge so they are hot and ready for your viewing pleasure 🔥.

## Inspiration

I took a **literal ton** of inspiration from [Lee Robinson](https://leerob.io/), his personal site, and his [codebase](https://github.com/leerob/leerob.io). You probably notice a resemblance in site design 😅. Lee is a super smart person has some [cool](https://react2025.com/) [courses](https://masteringnextjs.com/) that you should totally purchase.

The Tailwind styles were heavily-influenced by [Adam Wathan's Tailwind job site](https://github.com/adamwathan/tailwind-jobs) that he just open-sourced. The `.prose` class is 💯 and used a lot throughout the site.

I also took a lot of inspiration from [Josh W. Comeau](https://joshwcomeau.com/) and his blog. It's more of a long-term goal than a short-term one, because there are _so many_ cool things I could add like animations and sound effects in the future.

Special thanks to [Kyle Brumm](https://twitter.com/kyle_brumm) for giving me some design feedback 👏

---

That's it for me. Go ahead and follow me on Twitter at [@jplhomer](https://twitter.com/jplhomer), or [sign up for my newsletter](https://eepurl.com/c0jXpP) if you're interested in more.
