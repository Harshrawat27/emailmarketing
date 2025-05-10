'use client';

import { useState, useEffect } from 'react';
import { IUser } from '@/models/User';

export default function Dashboard() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');

        if (!response.ok) {
          throw new Error(
            `Failed to fetch users: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log('Fetched users:', data);
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSendEmail = (email: string) => {
    // Gmail mailto link
    const subject = encodeURIComponent('Hello from Dashboard');
    const body = encodeURIComponent(
      'Hi there,\n\nI wanted to reach out regarding...'
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  if (loading)
    return (
      <div className='flex justify-center items-center py-20'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );

  if (error)
    return (
      <div
        className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4'
        role='alert'
      >
        <strong className='font-bold'>Error:</strong>
        <span className='block sm:inline'> {error}</span>
      </div>
    );

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>User Dashboard</h1>
        <button
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow'
          onClick={() => {
            /* Add user modal trigger here */
          }}
        >
          Add User
        </button>
      </div>

      {users.length === 0 ? (
        <div className='text-center py-10 bg-gray-100 rounded-lg border border-gray-200'>
          <p className='text-gray-700 text-lg'>
            No users found. Add your first user to get started.
          </p>
        </div>
      ) : (
        <div className='overflow-x-auto bg-white rounded-lg shadow'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'
                >
                  Email
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'
                >
                  Created
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider'
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {users.map((user, index) => (
                <tr
                  key={user._id?.toString() || index}
                  className='hover:bg-gray-50'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                    {user.email}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center text-sm'>
                    <button
                      onClick={() => handleSendEmail(user.email)}
                      className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mx-1 shadow'
                      title='Send Email'
                    >
                      📧
                    </button>
                    <button
                      className='bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded mx-1 shadow'
                      title='Edit User'
                    >
                      ✏️
                    </button>
                    <button
                      className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded mx-1 shadow'
                      title='Delete User'
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
