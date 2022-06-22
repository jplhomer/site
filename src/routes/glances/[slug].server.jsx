import {useQuery} from '@shopify/hydrogen';
import Seo from '../../components/Seo.client';
import {getGlance} from '../../lib/use-glances';
import Glance from '../../components/Glance.client';

export default function GlancePost({params}) {
  const {slug} = params;
  const {data: glance} = useQuery(`glance-${slug}`, async () => {
    const markdownModule = await import(`../../glances/${slug}.md`);
    return await getGlance(markdownModule);
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Seo
        title={`Glance from ${new Date(glance.date).toDateString()}`}
        openGraph={{images: [{url: glance.image}]}}
        description={glance.html}
      />
      <Glance className="shadow mx-auto" glance={glance} />
    </div>
  );
}
