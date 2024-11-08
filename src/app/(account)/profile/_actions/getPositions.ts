// "use server";

// import { auth } from "@/auth";
// import { get } from "@/utils/api";
// import queryString from "qs";

// export const getPositions = async () => {
//   const session = await auth();

//   const token = session?.user?.token;

//   const query = queryString.stringify({
//     fields: ["name"],
//   });
//   const positionsReq = await get(`/positions?${query}`, token);

//   if (!positionsReq) {
//     throw new Error("Failed to fetch positions");
//   }

//   return positionsReq.data;
// };
