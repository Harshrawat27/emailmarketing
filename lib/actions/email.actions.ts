'use server';

import EmailTemplate from '@/database/models/email-template.model';
import { connectToDatabase } from '../mongoose';
import { revalidatePath } from 'next/cache';

export async function getEmailTemplates() {
  try {
    await connectToDatabase();

    const templates = await EmailTemplate.find().sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(templates));
  } catch (error) {
    console.error('Error getting email templates:', error);
    throw new Error('Failed to fetch email templates');
  }
}

export async function getEmailTemplateById(id: string) {
  try {
    await connectToDatabase();

    const template = await EmailTemplate.findById(id);

    if (!template) {
      throw new Error('Email template not found');
    }

    return JSON.parse(JSON.stringify(template));
  } catch (error) {
    console.error('Error getting email template:', error);
    throw new Error('Failed to fetch email template');
  }
}

export async function createEmailTemplate(
  templateData: { name: string; subject: string; body: string },
  path: string
) {
  try {
    await connectToDatabase();

    const newTemplate = await EmailTemplate.create({
      ...templateData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newTemplate));
  } catch (error) {
    console.error('Error creating email template:', error);
    throw new Error('Failed to create email template');
  }
}

export async function updateEmailTemplate(
  id: string,
  templateData: { name?: string; subject?: string; body?: string },
  path: string
) {
  try {
    await connectToDatabase();

    const updatedTemplate = await EmailTemplate.findByIdAndUpdate(
      id,
      {
        ...templateData,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedTemplate) {
      throw new Error('Email template not found');
    }

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedTemplate));
  } catch (error) {
    console.error('Error updating email template:', error);
    throw new Error('Failed to update email template');
  }
}

export async function deleteEmailTemplate(id: string, path: string) {
  try {
    await connectToDatabase();

    const deletedTemplate = await EmailTemplate.findByIdAndDelete(id);

    if (!deletedTemplate) {
      throw new Error('Email template not found');
    }

    revalidatePath(path);

    return { success: true };
  } catch (error) {
    console.error('Error deleting email template:', error);
    throw new Error('Failed to delete email template');
  }
}
