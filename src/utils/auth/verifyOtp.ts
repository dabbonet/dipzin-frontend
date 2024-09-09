export async function verifyOtp(email:string, otp : number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/otps/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        email,
        otp
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
