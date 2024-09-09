/* eslint-disable no-param-reassign */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// types/next-auth.d.ts

declare module "next-auth" {
  interface User {
    id?: string ;
    name?: string | null | undefined;
    email?: string | null | undefined;
    createdAt: string;
    updatedAt: string;
    is_paid: boolean;
    affiliate_code?: string | null | undefined;

    stripe_id?: string | null | undefined;
    emailVerified?: Date | null;
  }

  interface Session {
    user: {
      id: string ;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
      is_paid: boolean;
      affiliate_code?: string | null | undefined;
      stripe_id?: string | null | undefined;
    };
  }

  interface JWT {
    id: string ;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    is_paid: boolean;
    affiliate_code?: string;
    stripe_id?: string;
  }
}

export const {
  handlers, signIn, signOut, auth
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        otp: {},
      },

      authorize: async (credentials) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/otps/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              email: credentials?.email,
              otp: credentials?.otp,
            },
          }),
        });

        if (!res.ok) throw new Error("Invalid OTP");

        const { token } = await res.json();

        // Fetch user data using the received token
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!userResponse.ok) throw new Error("Failed to fetch user");

        const user = await userResponse.json();

        // console.log("Fetched user:", user);

        // Ensure all fields are defined, using null or default values if necessary
        return {
          id: user.id ?? "", // Use an empty string if `id` is missing
          name: user.name ?? user.username ?? "Anonymous", // Default to "Anonymous" if both are null
          email: user.email ?? "", // Use an empty string if `email` is missing
          createdAt: user.createdAt ?? new Date().toISOString(), // Use current date as fallback
          updatedAt: user.updatedAt ?? new Date().toISOString(), // Use current date as fallback
          is_paid: user.is_paid ?? false, // Default to false if `is_paid` is missing
          affiliate_code: user.affiliate_code ?? null, // Handle optional fields properly
          stripe_id: user.stripe_id ?? null, // Handle optional fields properly
        };
      },
    }),

  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          id: String(token.id),
          name: String(token.name),
          email: String(token.email),
          createdAt: String(token.createdAt),
          updatedAt: String(token.updatedAt),
          is_paid: Boolean(token.is_paid),
          affiliate_code: token.affiliate_code ? String(token.affiliate_code) : null,
          stripe_id: token.stripe_id ? String(token.stripe_id) : null,
          emailVerified: null,
        };
      }
      return session;
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? "Anonymous"; // Handle `null` name, defaulting to "Anonymous"
        token.email = user.email ?? "";
        token.createdAt = user.createdAt.toString();
        token.updatedAt = user.updatedAt.toString();
        token.is_paid = user.is_paid; // Ensure proper boolean type
        token.affiliate_code = user.affiliate_code ?? null;
        token.stripe_id = user.stripe_id ?? null;
      }
      return token;
    },
  },
});
