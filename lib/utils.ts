import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isValid, parseISO } from 'date-fns';

/**
 * Merges Tailwind CSS classes with clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to "dd MMM yyyy"
 */
export function formatDate(dateStr: string): string {
  const date = parseISO(dateStr);
  if (!isValid(date)) {
    return dateStr;
  }
  return format(date, 'dd MMM yyyy');
}

/**
 * Formats points to Indonesian grouping format (e.g., 1.500 poin)
 */
export function formatPoints(points: number): string {
  return new Intl.NumberFormat('id-ID').format(points) + ' poin';
}
