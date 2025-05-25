import type { EditTableEndpoint } from "#components/edit-table/edit-table.provider.types";

/**
 * Returns the singular name based on the provided endpoint, such as 'Category' for 'categories'.
 */
export function getSingularNameFromEndpoint(endpoint: EditTableEndpoint) {
  if (endpoint === 'categories') {
    return 'Category';
  }

  if (endpoint === 'statuses') {
    return 'Status';
  }

  return '';
}