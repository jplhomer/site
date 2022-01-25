import Header from './Header.client';
import Footer from './Footer.client';

export default function Layout({children}) {
  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50 border-t-8 border-blue-800 dark:border-blue-300 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
