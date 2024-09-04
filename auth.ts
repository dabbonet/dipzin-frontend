'use server'

type SignInParams = {
  email: string,
  referralToken?: string,
  invitationToken?: string,
}

export async function SignIn({ email, referralToken, invitationToken }: SignInParams) {
  const req = await fetch("/api/user/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        email,
        referralToken,
        invitationToken
      },
    }),
  });
  if (!req.ok) return { message: "Something went wrong", status: 404 };
  const data = await req.json();

  return data;
}
