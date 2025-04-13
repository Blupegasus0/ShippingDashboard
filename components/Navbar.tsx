'use client';

import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  pageName: string;
}

const Navbar: React.FC<NavbarProps> = ({ pageName }) => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-semibold">{pageName}</div>
        <div className="space-x-4 text-sm">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/upload" className="hover:underline">
            Upload
          </Link>
          <Link href="/search" className="hover:underline">
            Search
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
