'use client';

import { useState } from 'react';
import { WaitlistUser } from '@/types';
import { formatDate, createMailtoLink, getSourceDomain } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { updateWaitlistUser } from '@/lib/actions/waitlist.actions';
import { useRouter } from 'next/navigation';

interface WaitlistTableProps {
  users: WaitlistUser[];
  emailTemplates: {
    _id: string;
    name: string;
    subject: string;
    body: string;
  }[];
  currentPage: number;
  totalUsers: number;
  pageSize: number;
  hasMore: boolean;
}

const WaitlistTable = ({
  users,
  emailTemplates,
  currentPage,
  totalUsers,
  pageSize,
  hasMore,
}: WaitlistTableProps) => {
  const router = useRouter();
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [showEmailMenu, setShowEmailMenu] = useState<string | null>(null);

  const startEditFirstName = (user: WaitlistUser) => {
    setEditingUser(user._id);
    setFirstName(user.firstName || '');
  };

  const saveFirstName = async (userId: string) => {
    try {
      await updateWaitlistUser(userId, { firstName }, '/');
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating first name:', error);
    }
  };

  const toggleEmailMenu = (userId: string) => {
    if (showEmailMenu === userId) {
      setShowEmailMenu(null);
    } else {
      setShowEmailMenu(userId);
    }
  };

  const sendEmail = (user: WaitlistUser, templateId: string) => {
    const template = emailTemplates.find((t) => t._id === templateId);

    if (!template) return;

    // Process template with user data
    const userData = {
      username: user.username,
      email: user.email,
      firstName: user.firstName || '',
    };

    let processedSubject = template.subject;
    let processedBody = template.body;

    // Replace template variables
    Object.entries(userData).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processedSubject = processedSubject.replace(regex, value || `{{${key}}}`);
      processedBody = processedBody.replace(regex, value || `{{${key}}}`);
    });

    // Open mailto link
    window.open(createMailtoLink(user.email, processedSubject, processedBody));

    // Close email menu
    setShowEmailMenu(null);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      router.push(`/?page=${currentPage - 1}`);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      router.push(`/?page=${currentPage + 1}`);
    }
  };

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Email
            </th>
            <th scope='col' className='px-6 py-3'>
              Username
            </th>
            <th scope='col' className='px-6 py-3'>
              First Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Source
            </th>
            <th scope='col' className='px-6 py-3'>
              Signup Date
            </th>
            <th scope='col' className='px-6 py-3'>
              Referrals
            </th>
            <th scope='col' className='px-6 py-3'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
              <td className='px-6 py-4 font-medium text-gray-900 dark:text-white'>
                {user.email}
              </td>
              <td className='px-6 py-4'>{user.username}</td>
              <td className='px-6 py-4'>
                {editingUser === user._id ? (
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className='border border-gray-300 rounded px-2 py-1 text-sm w-24 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <button
                      onClick={() => saveFirstName(user._id)}
                      className='text-green-500 hover:text-green-700'
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className='flex gap-2 items-center'>
                    <span>{user.firstName || '—'}</span>
                    <button
                      onClick={() => startEditFirstName(user)}
                      className='text-blue-500 hover:text-blue-700 text-xs'
                    >
                      Edit
                    </button>
                  </div>
                )}
              </td>
              <td className='px-6 py-4'>{getSourceDomain(user.source)}</td>
              <td className='px-6 py-4'>{formatDate(user.signupDate)}</td>
              <td className='px-6 py-4'>{user.referralCount}</td>
              <td className='px-6 py-4 relative'>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => toggleEmailMenu(user._id)}
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Email
                  </button>

                  {showEmailMenu === user._id && (
                    <div className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700'>
                      <div className='py-1'>
                        <div className='px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-300'>
                          Select Template
                        </div>
                        {emailTemplates.length > 0 ? (
                          emailTemplates.map((template) => (
                            <button
                              key={template._id}
                              onClick={() => sendEmail(user, template._id)}
                              className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600'
                            >
                              {template.name}
                            </button>
                          ))
                        ) : (
                          <div className='px-4 py-2 text-sm text-gray-500 dark:text-gray-400'>
                            No templates found
                          </div>
                        )}
                        <div className='border-t border-gray-200 dark:border-gray-600'></div>
                        <Link
                          href='/emails/create'
                          className='block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-gray-600'
                        >
                          + Create new template
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className='flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
        <div className='text-sm text-gray-700 dark:text-gray-400'>
          Showing{' '}
          <span className='font-medium'>
            {(currentPage - 1) * pageSize + 1}
          </span>{' '}
          to{' '}
          <span className='font-medium'>
            {Math.min(currentPage * pageSize, totalUsers)}
          </span>{' '}
          of <span className='font-medium'>{totalUsers}</span> users
        </div>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={handleNextPage}
            disabled={!hasMore}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaitlistTable;
