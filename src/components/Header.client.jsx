// import useDarkMode from 'use-dark-mode';
import {useIsClient} from '../lib/use-is-client';
import {Link} from '@shopify/hydrogen/client';
// import {
//   LightBulbIcon as Lightbulb,
//   MoonIcon as Moon,
// } from '@heroicons/react/outline';

export default function Header() {
  const isClient = useIsClient();
  return (
    <header className="max-w-4xl mx-auto mb-4 flex items-center justify-between px-4 py-6">
      <Link to="/" className="font-bold text-lg">
        Josh Larson
      </Link>

      <nav className="flex items-center">
        <NavItem href="/about">About</NavItem>
        <NavItem href="/posts">Posts</NavItem>
        <NavItem href="/glances">Glances</NavItem>
        {/* <DarkModeToggle /> */}
      </nav>
    </header>
  );
}

function NavItem({href, children}) {
  return (
    <Link to={href} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 ml-2 md:ml-4">
      {children}
    </Link>
  );
}
