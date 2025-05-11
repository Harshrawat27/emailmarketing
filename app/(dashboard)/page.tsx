import {
  getWaitlistUsers,
  getWaitlistStats,
} from '@/lib/actions/waitlist.actions';
import { getEmailTemplates } from '@/lib/actions/email.actions';
import WaitlistTable from '@/components/dashboard/WaitlistTable';
import UserStats from '@/components/dashboard/UserStats';

interface PageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default async function Home({ searchParams }: PageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 10;
  const searchQuery = searchParams.search || '';

  const waitlistData = await getWaitlistUsers(page, pageSize, searchQuery);
  const stats = await getWaitlistStats();
  const emailTemplates = await getEmailTemplates();

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Waitlist Dashboard
        </h1>
        <p className='text-gray-500 dark:text-gray-400 mt-1'>
          Manage your waitlist and send personalized emails
        </p>
      </div>

      {/* Stats Overview */}
      <UserStats stats={stats} />

      {/* Search Bar (can be added later) */}

      {/* Users Table */}
      <WaitlistTable
        users={waitlistData.users}
        emailTemplates={emailTemplates}
        currentPage={page}
        totalUsers={waitlistData.totalUsers}
        pageSize={pageSize}
        hasMore={waitlistData.hasMore}
      />
    </div>
  );
}
