import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { fetchUserWithToken } from './utils/auth/fetchUserWithToken';
import { validateToken } from './actions/validateToken';

// Define a custom user type to include token
declare module 'next-auth' {
  interface User {
    token?: string;
    role?: string;
    is_paid?: boolean;
    stripe_id?: string;
  }
}

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

        if (res.ok && token) {
          // Return user object with token if authentication was successful
          return { ...user, token };
        }

        // If authentication failed, return null
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.token) {
        const isValid = await validateToken(user?.token as string);
        if (!isValid) {
          return {};
        }
      }
      return {
        ...token,
        ...(user && {
          id: user.id,
          sessionToken: user.token,
          is_paid: user.is_paid,
          stripe_id: user.stripe_id,
        }),
      };
    },
    async session({ session, token }) {
      // Return a new session object with the properties merged
      return {
        ...session,
        user: {
          ...session.user,
          token: token.sessionToken as string,
          id: token.id as string,
          is_paid: token.is_paid as boolean,
          stripe_id: token.stripe_id as string,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
});
