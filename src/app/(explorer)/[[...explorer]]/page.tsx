import { Panel } from "../_components/panel";
import React from "react";
import { createMetadata } from "../_utils/createMetadata";

const page = async () => <Panel />;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const metadata = createMetadata(params.explorer, searchParams);
  return metadata;
}

export default page;
