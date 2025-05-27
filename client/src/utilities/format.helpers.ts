/**
 * Takes a Date object or a string representing a date and returns a
 * formatted date string in the 'en-US' locale.
 */
export function formatDateForHumans(date: Date | string) {
  if (typeof date === 'string') {
    return new Date(date).toLocaleString('en-US');
  }

  return date.toLocaleString('en-US');
}