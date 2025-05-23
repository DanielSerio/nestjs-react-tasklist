/**
 * Gets a page title based on the pathname and an optional intro text.
 */
export function getPageTitle(pathname: string, withIntro?: boolean) {
  const intro = withIntro ? 'Task List | ' : '';

  return {
    '/': `${intro}Manage Tasks`,
    '/statuses': `${intro}Manage Statuses`,
    '/categories': `${intro}Manage Categories`,
  }[pathname] ?? '';
}