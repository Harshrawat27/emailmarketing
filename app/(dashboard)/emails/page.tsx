import { getEmailTemplates } from '@/lib/actions/email.actions';
import EmailTemplateList from '@/components/emails/EmailTemplateList';

export default async function EmailsPage() {
  const templates = await getEmailTemplates();

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Email Templates
        </h1>
        <p className='text-gray-500 dark:text-gray-400 mt-1'>
          Create and manage email templates for your waitlist
        </p>
      </div>

      <EmailTemplateList templates={templates} />
    </div>
  );
}
