import { EmailTemplate } from '@/types';
import EmailTemplateCard from './EmailTemplateCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmailTemplateListProps {
  templates: EmailTemplate[];
}

const EmailTemplateList = ({ templates }: EmailTemplateListProps) => {
  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
          Email Templates ({templates.length})
        </h2>
        <Link href='/emails/create'>
          <Button>Create New Template</Button>
        </Link>
      </div>

      {templates.length === 0 ? (
        <div className='bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-8 text-center'>
          <p className='text-gray-500 dark:text-gray-400 mb-4'>
            No email templates found.
          </p>
          <p className='text-gray-500 dark:text-gray-400 mb-6'>
            Create your first template to start sending personalized emails to
            your waitlist.
          </p>
          <Link href='/emails/create'>
            <Button>Create Your First Template</Button>
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {templates.map((template) => (
            <EmailTemplateCard key={template._id} template={template} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailTemplateList;
