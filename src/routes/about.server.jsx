import Wrapper from '../components/Wrapper';
import Heading from '../components/Heading';
import {html} from '../prose/about.md';
import Seo from '../components/Seo.client';

export default function About() {
  return (
    <Wrapper>
      <Seo
        title="About Josh Larson"
        description="Here's some stuff about Josh Larson. I bet you're glad you found this page."
      />
      <Heading className="mb-8">So, a little bit about me...</Heading>

      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{__html: html}}
      ></div>
    </Wrapper>
  );
}
