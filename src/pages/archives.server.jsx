import {PER_PAGE, useArchivePosts} from '../lib/use-archive-posts';
import ArchivePosts from '../components/ArchivePosts.client';

export default function Archives() {
  const postData = useArchivePosts(PER_PAGE);

  return <ArchivePosts {...postData} />;
}
