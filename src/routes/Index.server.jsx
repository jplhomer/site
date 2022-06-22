import {useQuery, Link} from '@shopify/hydrogen';

import {html as intro} from '../prose/intro.md';
import PostListItem from '../components/PostListItem.server';
import Seo from '../components/Seo.client';
import GlancePreview from '../components/GlancePreview';
import {usePosts} from '../lib/use-posts';
import {useGlances} from '../lib/use-glances';
import {Suspense} from 'react';
// TODO: xml2js is not compat with Worker runtimes.
// import {useRafterPosts} from '../lib/use-rafter-posts';

export default function Index() {
  const glances = useGlances().slice(0, 5);
  const rafterPosts = [];

  return (
    <div className="mt-8">
      <Seo
        title="Josh Larson - Software Engineer, Dad, Husband, Creator"
        description="I'm a dad, a software engineer, and a creator. I'm passionate about solving hard problems and creating great experiences for other people."
      />
      <div className="max-w-3xl mx-auto mb-6 p-4">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4">
            I&apos;m Josh Larson. Nice to meet you!
          </h1>
          <div
            className="prose dark:prose-invert text-lg font-medium leading-relaxed mb-4"
            dangerouslySetInnerHTML={{__html: intro}}
          ></div>
        </div>
        <Suspense fallback="Loading...">
          <PostList />
        </Suspense>
        <Link
          to="/posts"
          className="text-sm text-gray-600 dark:text-gray-300 font-medium"
        >
          All Posts
        </Link>
        <span className="mx-2">/</span>
        <Link
          to="/archives"
          className="text-sm text-gray-600 dark:text-gray-300 font-medium"
        >
          Archives
        </Link>{' '}
        <p className="mt-16 text-lg">
          Here are some <strong>projects</strong> I&apos;ve been building in my
          spare time:
        </p>
      </div>
      <div>
        <Project
          title="Flareact"
          image="/flareact.jpg"
          status="Launched"
          buttonText="View Docs"
          buttonUrl="https://flareact.com"
        >
          Flareact is an edge-rendered React framework built for{' '}
          <a
            className="underline font-medium whitespace-no-wrap"
            href="https://workers.cloudflare.com/"
          >
            Cloudflare Workers
          </a>
          . It is an open-source project inspired by{' '}
          <a
            className="underline font-medium whitespace-no-wrap"
            href="https://nextjs.org"
          >
            Next.js
          </a>
          . Check out the docs below, or visit the{' '}
          <a
            className="underline font-medium whitespace-no-wrap"
            href="https://github.com/flareact/flareact"
          >
            GitHub repo
          </a>
          .
        </Project>
        <Project
          title="Barkpass"
          image="https://www.barkpass.com/images/tag_data.jpg"
          status="Launched"
          buttonText="Visit Barkpass"
          buttonUrl="https://www.barkpass.com"
          flipped
        >
          <div className="mb-4">
            Launched in 2019, Barkpass is a pet licensing and dog park
            management software-as-a-service created by Bri and me. We have one
            customer so far, but we&apos;re looking to expand soon. Be sure to
            check out the blog,{' '}
            <a
              className="font-medium underline"
              href="https://building.barkpass.com"
            >
              Building Barkpass
            </a>
            :
          </div>
          <Suspense fallback="Loading...">
            <BarkpassPosts />
          </Suspense>
        </Project>
        <Project
          title="Rafter"
          image="/rafter.jpg"
          status="Archived"
          buttonText="View on GitHub"
          buttonUrl="https://github.com/rafter-platform/rafter-alpha"
        >
          <div className="mb-4">
            Rafter is an open-source serverless deployment platform built on top
            of Google Cloud. It&apos;s a side project I started building in
            2020. I&apos;m also writing about it on its own blog,{' '}
            <a
              className="underline font-medium whitespace-no-wrap"
              href="https://blog.rafter.app"
            >
              Inside Rafter
            </a>
            :
          </div>

          <ul className="mb-4">
            {rafterPosts.map((post) => (
              <li className="mb-1 text-sm" key={post.title}>
                <time
                  className="text-gray-600 dark:text-gray-300 text-xs w-16 mr-2 inline-block"
                  dateTime={post.date}
                >
                  {new Date(post.date).toLocaleDateString()}
                </time>

                <a className="underline" href={post.url}>
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </Project>
        <Project
          title="Fresa"
          image="/fresa.jpg"
          status="Launched"
          buttonText="View Docs"
          buttonUrl="https://fresa.jplhomer.org"
          flipped
        >
          Imagine if WordPress objects were as fluent and modern as Laravel
          Eloquent or Rails ActiveRecord models. Fresa makes that dream come
          true.
        </Project>
        <Project
          title="Full-Stack Fundamentals"
          image="/fsf.jpg"
          status="Archived"
          buttonText="Visit Website"
        >
          In 2018, I started an educational website where I&apos;d planned to
          record screencasts of all the cool things I learned. As it turns out,
          this was a lot more time-consuming than I thought, and the site never
          took off.
        </Project>
        <Project
          title="Lifeboat"
          status="Archived"
          buttonText="Visit Website"
          buttonUrl="https://uselifeboat.com"
          image="/lifeboat.jpg"
          flipped
        >
          Docker Compose is a command-line tool which can feel out of reach for
          beginners. I built a graphical user interface for it and called it
          Lifeboat.
        </Project>
      </div>
      <div className="max-w-5xl mx-auto mb-8 p-4">
        <h2 className="font-bold text-2xl mb-4">Glances</h2>
        <p className="mb-8">
          Check out some highlights from my world, or{' '}
          <Link to="/glances" className="underline">
            view them all
          </Link>
          :
        </p>
        <div className="grid gap-4 md:gap-8 grid-cols-3 md:grid-cols-5">
          {glances.map((glance) => (
            <Link key={glance.path} to={glance.path}>
              <GlancePreview glance={glance} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function PostList() {
  const posts = usePosts().slice(0, 5);

  return (
    <ul className="mb-4">
      {posts.map((post) => {
        return <PostListItem key={post.title} post={post} as={post.path} />;
      })}
    </ul>
  );
}

function BarkpassPosts() {
  const {data} = useQuery(
    'barkpass-posts',
    async () => {
      const res = await fetch('https://building.barkpass.com/feed.json');

      if (res.ok) {
        return await res.json();
      }

      return [];
    },
    {
      retry: false,
      cache: {
        maxAge: 60,
        staleWhileRevalidate: 60 * 60 * 12,
      },
    },
  );
  const barkpassPosts = data.map((entry) => ({
    ...entry,
    date: entry.date_published,
  }));

  return (
    <ul className="mb-4">
      {barkpassPosts.map((post) => (
        <li className="mb-1 text-sm" key={post.title}>
          <time
            className="text-gray-600 dark:text-gray-300 text-xs w-16 mr-2 inline-block"
            dateTime={post.date}
          >
            {new Date(post.date).toLocaleDateString()}
          </time>

          <a className="underline" href={post.url}>
            {post.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Project({
  title,
  image,
  children,
  status,
  buttonUrl,
  buttonText,
  flipped = false,
}) {
  return (
    <div className={`py-12 ${flipped ? 'bg-white dark:bg-gray-800' : ''}`}>
      <div
        className={`max-w-5xl mx-auto px-4 md:px-0 md:flex ${
          flipped ? 'flex-row-reverse' : ''
        }`}
      >
        <div className="mb-8 md:mb-0 md:w-1/2 md:px-4">
          <div className="flex">
            <h2 className="inline-flex text-xl tracking-tight leading-10 font-bold sm:leading-none mr-4">
              {buttonUrl ? (
                <a href={buttonUrl}>{title}</a>
              ) : (
                <span>{title}</span>
              )}
            </h2>
            <ProjectBadge>{status}</ProjectBadge>
          </div>
          <div className="mt-3 mb-3 text-base sm:mt-5 md:mt-5 md:mb-5">
            {children}
          </div>
          {buttonUrl && (
            <span className="inline-flex rounded-md shadow-sm">
              <span className="inline-flex rounded-md shadow-sm">
                <a
                  href={buttonUrl}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                >
                  {buttonText}
                </a>
              </span>
            </span>
          )}
        </div>
        <div className="md:w-1/2  md:px-4">
          <img
            loading="lazy"
            className="shadow-xl"
            src={
              image ||
              'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80'
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

function ProjectBadge({children}) {
  const color = getColor();

  function getColor() {
    if (/progress/i.test(children)) {
      return 'bg-yellow-100 text-yellow-800';
    }

    if (/launch/i.test(children)) {
      return 'bg-green-100 text-green-800';
    }

    return 'bg-gray-100 text-gray-800';
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 ${color} m-auto ml-0`}
    >
      {children}
    </span>
  );
}
