export default function Layout({children}) {
  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50 border-t-8 border-blue-800 dark:border-blue-300 dark:bg-gray-900 dark:text-gray-100">
      <header className="max-w-4xl mx-auto mb-4 flex items-center justify-between px-4 py-6">
        <a href="/" className="font-bold text-lg">
          Josh Larson
        </a>

        <nav className="flex items-center">
          <a href="/about">About</a>
          <a href="/posts">Posts</a>
          <a href="/glances">Glances</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mt-12 py-8 px-4 max-w-4xl mx-auto text-center">
        <img
          className="rounded-full mb-4 w-20 h-20 mx-auto"
          src="/headshot.jpg"
          alt="A photo of Josh"
        />
        <div className="mb-4">
          <a href="/" className="font-bold text-lg">
            Josh Larson
          </a>
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
          <a href="/archives" className="mx-2">
            Archives
          </a>
          <a className="mx-2" href="https://eepurl.com/c0jXpP">
            Newsletter
          </a>
        </div>
      </footer>
    </div>
  );
}
