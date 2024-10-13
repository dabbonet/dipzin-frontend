'use server';

import queryString from 'qs';

export const fetchInterests = async (token: string | undefined) => {
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
