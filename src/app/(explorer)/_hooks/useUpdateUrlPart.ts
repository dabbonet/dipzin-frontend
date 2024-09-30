// useUpdateUrlPart.ts

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { createUpdateUrlPart } from '../_utils/updateUrlPart';

export const useUpdateUrlPart = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return createUpdateUrlPart(router, pathname, searchParams);
};
