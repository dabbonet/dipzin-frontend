// useUpdateUrlPart.ts

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { createUpdateUrlPart } from '../_utils/updateUrlPart';

// Custom hook to get the updateUrlPart function
export const useUpdateUrlPart = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Return the updateUrlPart function
  return createUpdateUrlPart(router, pathname, searchParams);
};