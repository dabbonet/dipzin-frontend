"use server"

// type SignInParams = {
//   email: string,
//   referralToken?: string,
//   invitationToken?: string,
// }

export async function SignIn(
  email: string,
  referralToken: string,
  invitationToken: string
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/otps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {

        email,
        referralToken,
        invitationToken,
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    // console.log(response)
  }

  const data = await response.json();
  // console.log(data)
  return data;
}

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
    // console.log(response)
  }

  const data = await response.json();
  // console.log(data)
  return data;
}
