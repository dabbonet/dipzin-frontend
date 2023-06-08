'use client'
import React, { useState } from 'react'

const StepTwoButton = ({tilte}) => {
    const [clicked, setClicked] = useState(false)
    let buttonBorder = ''
    if (clicked) buttonBorder = 'border-aqua-500'
    const clickButton = () => {
        setClicked(!clicked)
    }
  return (
      <button
          className={` text-slate-200 py-2 px-4 rounded-2xl bg-slate-900 border-solid border ${buttonBorder}`}
          onClick={clickButton}
      >
          {tilte}
      </button>
  )
}

export default StepTwoButton