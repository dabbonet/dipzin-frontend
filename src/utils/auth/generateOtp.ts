export async function generateOtp(email: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/otps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        email,
        referralToken: null,
        invitationToken: null,
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
