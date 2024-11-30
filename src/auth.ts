import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { fetchUserWithToken } from "./utils/auth/fetchUserWithToken";

// Define a custom user type to include token
declare module "next-auth" {
  interface User {
    token: string;
    avatar: {
      id: number;
      hash: string;
      ext: string;
      width: number;
      height: number;
    };
    username: string;
    role: string;
    confirmed: boolean;
    is_paid: boolean;
    affiliate_code: string;
    stripe_id: string;
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
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        // Verify the OTP
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/otps/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: {
              email: credentials.email,
              otp: credentials.otp,
            },
          }),
        });

        if (!res.ok) {
          throw new Error("Invalid OTP");
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
    async jwt({ token, trigger, user }) {
      if (trigger === "update") {
        const updatedUser = await fetchUserWithToken(
          token.sessionToken as string,
        );
        return {
          ...token,
          ...updatedUser,
        };
      }

      return {
        ...token,
        ...(user && {
          id: user.id,
          avatar: user.avatar,
          username: user.username,
          sessionToken: user.token,
          confirmed: user.confirmed,
          is_paid: user.is_paid,
          affiliate_code: user.affiliate_code,
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
          avatar: token.avatar as {
            id: number;
            hash: string;
            ext: string;
            width: number;
            height: number;
          },
          username: token.username as string,
          confirmed: token.confirmed as boolean,
          id: token.id as string,
          is_paid: token.is_paid as boolean,
          affiliate_code: token.affiliate_code as string,
          stripe_id: token.stripe_id as string,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  redirectProxyUrl: process.env.BASE_URL,
  trustHost: true,
});
