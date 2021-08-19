import Wrapper from '../components/Wrapper';
import Heading from '../components/Heading';
import Seo from '../components/Seo.client';
import GlancePreview from '../components/GlancePreview';
import Link from '../components/Link.client';
import {useGlances} from '../lib/use-glances';

export default function Glances() {
  const glances = useGlances();

  return (
    <Wrapper>
      <Seo title="Glances" />
      <Heading className="mb-8">Glances</Heading>

      <p className="mb-8">
        Glances give you a peek into my life and the things I enjoy.
      </p>

      <div className="grid grid-cols-3 mt-4 gap-1 md:gap-6 -mx-4 md:mx-0">
        {glances.map((glance) => (
          <Link key={glance.path} to={glance.path}>
            <GlancePreview glance={glance} />
          </Link>
        ))}
      </div>
    </Wrapper>
  );
}
