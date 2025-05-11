'use client';

import { WaitlistStats } from '@/types';
import { getSourceDomain } from '@/lib/utils';

interface UserStatsProps {
  stats: WaitlistStats;
}

const UserStats = ({ stats }: UserStatsProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
      {/* Total Users */}
      <div className='bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg'>
        <div className='p-5'>
          <div className='flex items-center'>
            <div className='flex-shrink-0 bg-indigo-500 rounded-md p-3'>
              <svg
                className='h-6 w-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                ></path>
              </svg>
            </div>
            <div className='ml-5 w-0 flex-1'>
              <dl>
                <dt className='text-sm font-medium text-gray-500 dark:text-gray-400 truncate'>
                  Total Users
                </dt>
                <dd>
                  <div className='text-lg font-medium text-gray-900 dark:text-white'>
                    {stats.totalUsers}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Last Week Signups */}
      <div className='bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg'>
        <div className='p-5'>
          <div className='flex items-center'>
            <div className='flex-shrink-0 bg-green-500 rounded-md p-3'>
              <svg
                className='h-6 w-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </div>
            <div className='ml-5 w-0 flex-1'>
              <dl>
                <dt className='text-sm font-medium text-gray-500 dark:text-gray-400 truncate'>
                  Last 7 Days
                </dt>
                <dd>
                  <div className='text-lg font-medium text-gray-900 dark:text-white'>
                    {stats.lastWeekUsers}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Growth */}
      <div className='bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg'>
        <div className='p-5'>
          <div className='flex items-center'>
            <div className='flex-shrink-0 bg-yellow-500 rounded-md p-3'>
              <svg
                className='h-6 w-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                ></path>
              </svg>
            </div>
            <div className='ml-5 w-0 flex-1'>
              <dl>
                <dt className='text-sm font-medium text-gray-500 dark:text-gray-400 truncate'>
                  Weekly Growth
                </dt>
                <dd>
                  <div className='text-lg font-medium text-gray-900 dark:text-white'>
                    {stats.totalUsers > 0
                      ? `${(
                          (stats.lastWeekUsers / stats.totalUsers) *
                          100
                        ).toFixed(1)}%`
                      : '0%'}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
