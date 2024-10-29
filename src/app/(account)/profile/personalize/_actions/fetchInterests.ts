'use server';

import { auth } from '@/auth';
import queryString from 'qs';

export const fetchInterests = async () => {
  const session = await auth()

  const token = session?.user?.token;

  const query = queryString.stringify({
    fields: ["name"]
  });
  const interestsReq = await fetch(`https://rah.dipzin.com/api/interests?${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!interestsReq.ok) {
    throw new Error('Failed to fetch interests');
  }

  const interestsRes = await interestsReq.json();
  return interestsRes;
};
