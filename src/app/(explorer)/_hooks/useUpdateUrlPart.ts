// useUpdateUrlPart.ts

import { useRouter } from 'next/navigation';
import { createUpdateUrlPart } from '../_utils/updateUrlPart';

// Custom hook to get the updateUrlPart function
export const useUpdateUrlPart = () => {
  const router = useRouter();

  // Return the updateUrlPart function
  return createUpdateUrlPart(router);
};
