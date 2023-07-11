import Pricing from '@/components/pricing'
import React from 'react'

export default async function page()  {
  pricingList()
  return (
    <Pricing/>
  )
}


const pricingList = async ()=> {
  const req = await fetch('https://rah.dipzin.com/api/pricing')
  const res = await req.json()
  console.log(res)
}
