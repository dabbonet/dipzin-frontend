// updateUrlPart.ts

import { Filter } from '@/types/navigation-types';

type UpdateUrlPartType = (
  part: 'platform' | 'pattern' | 'filters' | 'apps',
  value: string | Filter[] | string[]
) => void;

export const createUpdateUrlPart = (
  router: any,
  pathname: string,
  searchParams: URLSearchParams
): UpdateUrlPartType => {

  // The updateUrlPart Function
  return (
    part: 'platform' | 'pattern' | 'filters' | 'apps',
    value: string | Filter[] | string[]
  ) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    // Utility functions
    const deleteAllFilters = () => {
      ['tag', 'component', 'category', 'flow', 'marketing'].forEach((param) =>
        updatedSearchParams.delete(param)
      );
    };

    const appendFilterWithoutDuplication = (key: string, value: string) => {
      const existingValues = updatedSearchParams.getAll(key);
      if (!existingValues.includes(value)) {
        updatedSearchParams.append(key, value);
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
        if (typeof value === 'string') {
          pathSegments = pathSegments.slice(0, 2);
          pathSegments[2] = (value as string).toLowerCase();
          updatedSearchParams.delete('app');
        } else if (Array.isArray(value) && value.length === 0) {
          pathSegments = pathSegments.slice(0, 2);
          updatedSearchParams.delete('app');
        } else {
          updatedSearchParams.delete('app');
          (value as string[]).forEach((app) => appendFilterWithoutDuplication('app', app));
        }
        break;
      case 'filters':
        if (typeof value === 'string') {
          const [pattern, name] = value.split('/') ?? [];
          const patternHandle = pattern === 'categories' ? 'apps' : pattern || '';

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
            }
          });
        }
        break;
    }

    const updatedPath = `/${pathSegments.join('/')}`;
    const newUrl = `${updatedPath}?${updatedSearchParams.toString()}`;

    router.push(newUrl);
  };
};
