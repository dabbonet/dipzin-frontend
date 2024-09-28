import { Panel } from '../_components/panel'
import React from 'react'

const page = async ({params, searchParams}:any) => {
  const platform = params?.explorer && params?.explorer[0];
  const pattern = params?.explorer && params?.explorer[1];
  return (
    <div className="size-full">
      <Panel pattern={pattern} platform={platform} />
    </div>
)};

export default page
