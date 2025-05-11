import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to a readable string
export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Process email template with dynamic values
export function processEmailTemplate(
  template: string,
  data: { [key: string]: string }
): string {
  let processed = template;

  // Replace all {{variable}} with the actual values
  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    processed = processed.replace(regex, value || `{{${key}}}`);
  });

  return processed;
}

// Create a mailto URL with subject and body
export function createMailtoLink(
  email: string,
  subject: string,
  body: string
): string {
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

// Truncate text with ellipsis if it exceeds maxLength
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Get source domain from URL
export function getSourceDomain(url: string): string {
  try {
    if (!url) return 'Direct';

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    const domain = new URL(url).hostname.replace('www.', '');
    return domain;
  } catch (error) {
    return url || 'Unknown';
  }
}
