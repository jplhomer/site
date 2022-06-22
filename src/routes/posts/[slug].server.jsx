import {useQuery} from '@shopify/hydrogen';
import Seo from '../../components/Seo.client';
import ViewCounter from '../../components/ViewCounter.server';

export default function Post({params}) {
  const {slug} = params;

  const {
    data: {attributes, html},
  } = useQuery(`post-${slug}`, async () => import(`../../posts/${slug}.md`));

  return (
    <div className="max-w-3xl p-4 mx-auto prose dark:prose-dark">
      <Seo
        title={attributes.title}
        description={attributes.description ?? ''}
      />
      <h1 className="mb-4">{attributes.title}</h1>
      <div className="mb-8 flex justify-between">
        <time dateTime={new Date(attributes.date).toISOString()}>
          {new Date(attributes.date).toLocaleDateString()}
        </time>
        <ViewCounter id={`/posts/${slug}`} shouldIncrement={true} />
      </div>
      <div dangerouslySetInnerHTML={{__html: html}}></div>
    </div>
  );
}
