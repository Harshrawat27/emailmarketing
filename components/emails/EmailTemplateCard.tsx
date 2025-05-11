'use client';

import { EmailTemplate } from '@/types';
import { formatDate, truncateText } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteEmailTemplate } from '@/lib/actions/email.actions';
import { useState } from 'react';

interface EmailTemplateCardProps {
  template: EmailTemplate;
}

const EmailTemplateCard = ({ template }: EmailTemplateCardProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteEmailTemplate(template._id, '/emails');
      router.refresh();
    } catch (error) {
      console.error('Error deleting template:', error);
      alert('Failed to delete template');
    } finally {
      setIsDeleting(false);
      setShowConfirmDelete(false);
    }
  };

  return (
    <div className='bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg'>
      <div className='px-4 py-5 sm:p-6'>
        <div className='flex justify-between items-start'>
          <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-white'>
            {template.name}
          </h3>
          <div className='flex items-center gap-2'>
            <Link href={`/emails/${template._id}/edit`}>
              <Button variant='outline' size='sm'>
                Edit
              </Button>
            </Link>
            <Button
              variant='destructive'
              size='sm'
              onClick={() => setShowConfirmDelete(true)}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>

        <div className='mt-2'>
          <p className='text-sm text-gray-700 dark:text-gray-300 font-medium'>
            Subject: {template.subject}
          </p>
        </div>

        <div className='mt-3'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {truncateText(template.body, 150)}
          </p>
        </div>

        <div className='mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400'>
          <span>Created: {formatDate(template.createdAt)}</span>
          <span>Updated: {formatDate(template.updatedAt)}</span>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDelete && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-4'>
              Delete Template
            </h3>
            <p className='text-gray-500 dark:text-gray-400 mb-6'>
              Are you sure you want to delete the "{template.name}" template?
              This action cannot be undone.
            </p>
            <div className='flex justify-end gap-3'>
              <Button
                variant='outline'
                onClick={() => setShowConfirmDelete(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant='destructive'
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateCard;
