// components/Header.tsx
import Link from 'next/link';
import { useState } from 'react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Trust Wallet</h1>
          </div>
          <div className="hidden md:flex md:items-center">
            <nav className="flex space-x-4">
              <Link href="#about">
                About &nbsp;&nbsp;&nbsp;&nbsp;
              </Link>
              <Link href="#form">
                Form
              </Link>
            </nav>
          </div>
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-500 focus:outline-none focus:text-blue-500"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#about">
            About &nbsp;&nbsp;&nbsp;&nbsp;
            </Link>
            <Link href="#form">
              Form
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
