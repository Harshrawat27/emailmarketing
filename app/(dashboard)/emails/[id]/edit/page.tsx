import { notFound } from 'next/navigation';
import { getEmailTemplateById } from '@/lib/actions/email.actions';
import EmailForm from '@/components/emails/EmailForm';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditEmailPage({ params }: PageProps) {
  const template = await getEmailTemplateById(params.id);

  if (!template) {
    notFound();
  }

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Edit Email Template
        </h1>
        <p className='text-gray-500 dark:text-gray-400 mt-1'>
          Update your email template
        </p>
      </div>

      <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-6'>
        <EmailForm
          mode='edit'
          initialData={{
            _id: template._id,
            name: template.name,
            subject: template.subject,
            body: template.body,
          }}
        />
      </div>
    </div>
  );
}
