'use server'

import { auth } from "@/auth";
import { post } from "@/utils/api";

// Server action to fetch data from backend
export async function fetchDataAction(dataQuery: any) {
  console.log('dataQuery: ', JSON.stringify(dataQuery, null, 2));
  const session = await auth()
  const token = session?.user?.token;
  const response = await post('/search-dipzin', dataQuery, token);
  console.log('response: ', JSON.stringify(response, null, 2));
  return response;
}
