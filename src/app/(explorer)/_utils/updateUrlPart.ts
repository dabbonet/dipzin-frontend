import type { Filter } from '@/types/navigation-types';
import { getPatternHandle } from './queryUtils';

type UpdateUrlPartType = (
  part: 'platform' | 'pattern' | 'filters' | 'apps',
  value: string | Filter[] | string[] | any
) => string;

export const createUpdateUrlPart = (
  router: any,
  pathname: string,
  searchParams: URLSearchParams
): UpdateUrlPartType => (part, value) => { // The updateUrlPart Function
  const updatedSearchParams = new URLSearchParams(searchParams.toString());

  // Utility functions
  const deleteAllFilters = () => {
    ['tag', 'component', 'category', 'flow', 'marketing'].forEach((param) => updatedSearchParams.delete(param));
  };

  const appendFilterWithoutDuplication = (key: string, filterValue: string) => {
    const existingValues = updatedSearchParams.getAll(key);
    if (!existingValues.includes(filterValue)) {
      updatedSearchParams.append(key, filterValue);
    }
  };

  // Logic to update the URL based on the 'part' and 'value' parameters
  let pathSegments = pathname.split('/').filter(Boolean);

  switch (part) {
    case 'platform':
      pathSegments[0] = (value as string).toLowerCase();
      break;
    case 'pattern':
      pathSegments[1] = (value as string).toLowerCase();
      break;
    case 'apps':
      if (value.slug) {
        pathSegments = pathSegments.slice(0, 2);
        pathSegments[3] = 'app';
        pathSegments[4] = (value.slug as string).toLowerCase();
        updatedSearchParams.delete('app');
      } else if (Array.isArray(value) && value.length === 0) {
        pathSegments = pathSegments.slice(0, 2);
        updatedSearchParams.delete('app');
      } else {
        updatedSearchParams.delete('app');
        pathSegments = pathSegments.slice(0, 2);
        (value as any[]).forEach((app) => appendFilterWithoutDuplication('app', app.slug));
      }
      break;
    case 'filters':
      if (typeof value === 'string') {
        const [pattern, name] = value.split('/') ?? [];
        const patternHandle = getPatternHandle(pattern || '');

        if (pattern && name) {
          pathSegments = pathSegments.slice(0, 1);
          pathSegments.push(patternHandle.toLowerCase(), name);
          deleteAllFilters();
        }
      } else if (Array.isArray(value) && value.length === 0) {
        pathSegments = pathSegments.slice(0, 2);
        deleteAllFilters();
      } else {
        pathSegments = pathSegments.slice(0, 2);
        deleteAllFilters();

        (value as Filter[]).forEach((filter) => {
          switch (filter.pattern) {
            case 'tags':
              appendFilterWithoutDuplication('tag', filter.name);
              break;
            case 'components':
              appendFilterWithoutDuplication('component', filter.name);
              break;
            case 'categories':
              appendFilterWithoutDuplication('category', filter.name);
              break;
            case 'flowActions':
              appendFilterWithoutDuplication('flow', filter.name);
              break;
            case 'marketing':
              appendFilterWithoutDuplication('marketing', filter.name);
              break;
            default:
              // Default case for unrecognized patterns
              break;
          }
        });
      }
      break;
    default:
      // Default case for unrecognized part types
      break;
  }

  const updatedPath = `/${pathSegments.join('/')}`;
  const newUrl = `${updatedPath}?${updatedSearchParams.toString()}`;
  const pattern = pathSegments[2]?.toString() || '';
  router.push(newUrl);
  return pattern; // Return Pattern
};
