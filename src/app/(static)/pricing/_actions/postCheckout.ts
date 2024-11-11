"use server"

import { auth } from "@/auth";
import { post } from "@/utils/api";

export async function postCheckout(id: string) {
  const session = await auth();

  const token = session?.user?.token;

  const req = await post(
    'subscriptions/create-checkout',
    {
      data: {
        item: id
      }
    },
    token
  );

  if (!req) {
    throw new Error("Failed to post checkout");
  }

  return req.data;
}
