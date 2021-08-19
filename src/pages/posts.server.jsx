import Seo from '../components/Seo.client';
import Heading from '../components/Heading';
import PostListItem from '../components/PostListItem.client';
import {usePosts} from '../lib/use-posts';
import Link from '../components/Link.client';
import Wrapper from '../components/Wrapper';

export default function Posts() {
  const posts = usePosts();

  return (
    <Wrapper>
      <Seo title="Posts" />
      <Heading className="mb-8">Posts</Heading>

      <ul className="mb-8">
        {posts.map((post) => {
          return <PostListItem key={post.path} post={post} as={post.path} />;
        })}
      </ul>

      <p className="italic">
        Looking for older stuff?{' '}
        <Link to="/archives" className="underline">
          Check out the archives
        </Link>
        .
      </p>
    </Wrapper>
  );
}
