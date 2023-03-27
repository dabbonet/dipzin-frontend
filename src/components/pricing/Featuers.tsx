import React from 'react'

type Props = {
    feature: string
}

const Featuers = ({feature}: Props) => {
  return (
      <div className=' flex gap-2 font-medium lg:text-lg md:text-base text-sm'>
          <img src="/images/assets/check.svg" alt="check" />
          <p>{feature}</p>
    </div>
  )
}

export default Featuers