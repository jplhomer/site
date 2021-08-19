import {useQuery} from 'react-query';
import {useParams} from 'react-router-dom';
import Seo from '../../components/Seo.client';

export default function Post() {
  const {slug} = useParams();

  const {
    data: {attributes, html},
  } = useQuery(`post-${slug}`, async () => import(`../../posts/${slug}.md`));

  return (
    <div className="max-w-3xl p-4 mx-auto prose">
      <Seo
        title={attributes.title}
        description={attributes.description ?? ''}
      />
      <h1 className="mb-4">{attributes.title}</h1>
      <div className="mb-8 flex justify-between">
        <time dateTime={new Date(attributes.date).toISOString()}>
          {new Date(attributes.date).toLocaleDateString()}
        </time>
      </div>
      <div className="prose" dangerouslySetInnerHTML={{__html: html}}></div>
    </div>
  );
}
