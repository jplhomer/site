import {Link} from '@shopify/hydrogen/client';

export default function Footer() {
  return (
    <footer className="mt-12 py-8 px-4 max-w-4xl mx-auto text-center">
      <img
        className="rounded-full mb-4 w-20 h-20 mx-auto"
        src="/headshot.jpg"
        alt="A photo of Josh"
      />
      <div className="mb-4">
        <Link to="/" className="font-bold text-lg">
          Josh Larson
        </Link>
      </div>
      <div className="mb-4">
        <a className="mx-2" href="https://twitter.com/jplhomer">
          Twitter
        </a>
        <a className="mx-2" href="https://github.com/jplhomer">
          GitHub
        </a>
        <a className="mx-2" href="https://linkedin.com/in/jplhomer">
          LinkedIn
        </a>
        <a className="mx-2" href="https://instagram.com/jplhomer">
          Instagram
        </a>
        <a className="mx-2" href="mailto:jplhomer@gmail.com">
          Email
        </a>
      </div>
      <div className="text-xs">
        <Link to="/archives" className="mx-2">
          Archives
        </Link>
        <a className="mx-2" href="/rss-feed.xml">
          RSS
        </a>
        <a className="mx-2" href="https://eepurl.com/c0jXpP">
          Newsletter
        </a>
      </div>
    </footer>
  );
}
