import EmailForm from '@/components/emails/EmailForm';

export default function CreateEmailPage() {
  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Create Email Template
        </h1>
        <p className='text-gray-500 dark:text-gray-400 mt-1'>
          Create a new email template with dynamic fields
        </p>
      </div>

      <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-6'>
        <EmailForm mode='create' />
      </div>
    </div>
  );
}
