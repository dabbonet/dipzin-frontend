'use server';

export const saveUserPreferences = async (
  token: string | undefined,
  positions: number[],
  interests: number[]
) => {
  const savePositions = fetch(`https://rah.dipzin.com/api/user-positions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: { positions },
    }),
  });

  const saveInterests = fetch(`https://rah.dipzin.com/api/user-interests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: { interests },
    }),
  });

  const [positionsResponse, interestsResponse] = await Promise.all([
    savePositions, saveInterests,
  ]);

  if (!positionsResponse.ok || !interestsResponse.ok) {
    throw new Error('Failed to save preferences');
  }
};
