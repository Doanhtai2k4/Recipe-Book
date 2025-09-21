import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-xl font-bold hover:text-blue-200">
          Recipe Book
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-blue-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/recipes/new" className="hover:text-blue-200 transition-colors">
                Add Recipe
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;