import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { fetchUserWithToken } from './utils/auth/fetchUserWithToken';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        otp: { label: 'OTP', type: 'text' },
      },
      async authorize(credentials) {
        // Verify the OTP
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/otps/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              email: credentials.email,
              otp: credentials.otp,
            },
          }),
        });

        if (!res.ok) {
          throw new Error('Invalid OTP');
        }

        const { token } = await res.json();

        // Fetch user data using the token
        const user = await fetchUserWithToken(token);

        // Return the user object with token included
        return {
          ...user,
          token,
        };
      },
    }),
  ],
});
