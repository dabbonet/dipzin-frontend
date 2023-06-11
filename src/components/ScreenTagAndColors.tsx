'use client'
import React, { useEffect, useState } from 'react'
const qs = require('qs');
const ScreenTagAndColors = ({ screenId }) => {
    const [data, setData] = useState(null)
    const query = qs.stringify({
        populate: {
            tags: '*'
        }
    }, {
        encode: false
      })
    useEffect(() => {
        async function getData() {
            const req = await fetch(`/api/screens`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    screenId,
                    query
                })
          })
          const res = await req.json()
            setData({
                colors: res.data.attributes.colors,
                tags: res.data.attributes.tags.data
            })
        }
        getData()
    }, [])
    const Tags = () => {
        return <div className=' flex gap-2 flex-wrap'>
            {data?.tags.map(el => (
            <Tag name={el.attributes.name} key={el}/>
        ))}
        </div>
    }
    const Colors = () => {
        const colorsArr = data?.colors.split(',')
        return <div className=' flex gap-2 flex-wrap'>
            {colorsArr?.map(el => (
            <ColorSquare color={el} key={el}/>
        ))}
        </div>
    }
  return (
      <div className=' bg-slate-950 p-8 flex flex-col gap-y-8 rounded-3xl'>
          <div>
              <p className=' text-slate-500 text-sm mb-2'>Tags</p>
              <Tags/>
          </div>
          <div>
              <p className=' text-slate-500 text-sm mb-2'>Components</p>
              <Tags/>
          </div>
          <div>
              <p className=' text-slate-500 text-sm mb-2'>Colors</p>
              <Colors/>
          </div>
    </div>
  )
}

export default ScreenTagAndColors


const ColorSquare = ({ color }) => {
    return <div className={` w-11 h-11 bg-[${color}] rounded-xl`}></div>
}

const Tag = ({ name }) => {
    return <div className=' bg-slate-800 py-1 px-4 rounded-3xl'>{name}</div>
}
