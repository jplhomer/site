import Seo from './Seo.client';
import {useArchivePost} from '../lib/use-archive-posts';
import ViewCounter from './ViewCounter.server';

export default function ArchivePost({slug}) {
  const post = useArchivePost(slug.split('/').pop());

  const openGraphImages = post.thumbnail ? [{url: post.thumbnail}] : [];

  return (
    <div>
      <Seo
        title={post.title}
        description={post.description}
        openGraph={{
          images: openGraphImages,
        }}
      />
      <div className="max-w-3xl p-4 mx-auto prose dark:prose-dark">
        <h1 className="mb-4">{post.title}</h1>
        {post.dek && (
          <div
            className="text-xl mb-4 text-gray-600 dark:text-gray-300 italic"
            dangerouslySetInnerHTML={{__html: post.dek}}
          />
        )}
        <div className="mb-8 flex justify-between">
          <time dateTime={new Date(post.date).toISOString()}>
            {new Date(post.date).toLocaleDateString()}
          </time>
          <ViewCounter id={post.slug} shouldIncrement={true} />
        </div>
        <div dangerouslySetInnerHTML={{__html: post.content.rendered}} />
      </div>
    </div>
  );
}
