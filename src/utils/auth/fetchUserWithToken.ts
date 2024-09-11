export async function fetchUserWithToken(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const user = await response.json();
  return user;
}
