'use client';

import { useState } from 'react';
import {
  createEmailTemplate,
  updateEmailTemplate,
} from '@/lib/actions/email.actions';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface EmailFormProps {
  initialData?: {
    _id?: string;
    name: string;
    subject: string;
    body: string;
  };
  mode: 'create' | 'edit';
}

const EmailForm = ({ initialData, mode }: EmailFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    subject: initialData?.subject || '',
    body: initialData?.body || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const insertVariable = (variable: string) => {
    const textArea = document.getElementById('body') as HTMLTextAreaElement;
    if (!textArea) return;

    const cursorPos = textArea.selectionStart;
    const text = textArea.value;
    const newText =
      text.slice(0, cursorPos) + `{{${variable}}}` + text.slice(cursorPos);

    setFormData((prev) => ({ ...prev, body: newText }));

    // Set cursor position after inserted variable
    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(
        cursorPos + variable.length + 4,
        cursorPos + variable.length + 4
      );
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (mode === 'create') {
        await createEmailTemplate(formData, '/emails');
        router.push('/emails');
      } else if (mode === 'edit' && initialData?._id) {
        await updateEmailTemplate(initialData._id, formData, '/emails');
        router.push('/emails');
      }
    } catch (err) {
      console.error('Error saving email template:', err);
      setError('Failed to save email template. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {error && (
        <div className='p-4 bg-red-50 border border-red-200 text-red-700 rounded-md'>
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Template Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
        />
      </div>

      <div>
        <label
          htmlFor='subject'
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Email Subject
        </label>
        <input
          type='text'
          id='subject'
          name='subject'
          value={formData.subject}
          onChange={handleChange}
          required
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
        />
      </div>

      <div>
        <div className='flex justify-between items-center'>
          <label
            htmlFor='body'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            Email Body
          </label>
          <div className='flex space-x-2'>
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              Insert variable:
            </span>
            <button
              type='button'
              onClick={() => insertVariable('username')}
              className='text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400'
            >
              {{ username }}
            </button>
            <button
              type='button'
              onClick={() => insertVariable('firstName')}
              className='text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400'
            >
              {{ firstName }}
            </button>
            <button
              type='button'
              onClick={() => insertVariable('email')}
              className='text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400'
            >
              {{ email }}
            </button>
          </div>
        </div>
        <textarea
          id='body'
          name='body'
          value={formData.body}
          onChange={handleChange}
          required
          rows={10}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
        />
        <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
          Use {{ variable }} syntax to include dynamic content.
        </p>
      </div>

      <div className='flex gap-4'>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting
            ? 'Saving...'
            : mode === 'create'
            ? 'Create Template'
            : 'Update Template'}
        </Button>
        <Button
          type='button'
          variant='outline'
          onClick={() => router.push('/emails')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EmailForm;
