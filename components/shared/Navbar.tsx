'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/' },
    { name: 'Email Templates', href: '/emails' },
  ];

  return (
    <nav className='bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-700'>
      <div className='px-4 py-4 lg:px-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start'>
            <Link href='/' className='flex items-center'>
              <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                Waitlist Dashboard
              </span>
            </Link>
          </div>
          <div className='flex items-center lg:order-2'>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
              Admin
            </span>
          </div>
          <div className='hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ml-8'>
            <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-2 pr-4 pl-3 rounded 
                      ${
                        pathname === link.href
                          ? 'text-blue-600 dark:text-blue-500'
                          : 'text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500'
                      } lg:p-0`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
