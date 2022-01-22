import ArchivePosts from '../../components/ArchivePosts.server';
import {PER_PAGE, useArchivePosts} from '../../lib/use-archive-posts';

export default function ArchivePostsPage({params}) {
  const {page} = params;
  const {posts, total} = useArchivePosts(
    PER_PAGE,
    PER_PAGE * (Number(page) - 1),
  );

  return <ArchivePosts page={Number(page)} posts={posts} total={total} />;
}
