import React from 'react'

const CollectionCard = () => {
    return (
        <a href="collection/1" className="w-full h-auto relative bg-slate-800 rounded-2xl p-5 hover:scale-105 duration-500">
            <div className='grid grid-cols-4 gap-1'>
                {/* <div className="row-span-4 col-span-2 flex space-x-2 bg-red-800">teste</div>
                <div className="col-span-1 row-span-4 flex flex-col bg-yellow-800">tests</div> */}
                <div className="row-span-4 col-span-3 flex space-x-3">
                    <img
                        className="w-[50%] h-min  rounded-xl"
                        src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/5064be39-8584-4bfc-ad7e-b9d0a06cd5b9.png"
                    />
                    <img
                        className="w-[50%] h-min rounded-xl"
                        src="https://megwwpcxnmhjjtxlcvqy.supabase.co/storage/v1/object/public/application/screens/525/5064be39-8584-4bfc-ad7e-b9d0a06cd5b9.png"
                    />
                </div>
                <div className="row-span-4 col-span-1 space-y-1 pl-2 lg:pl-4">
                    <img
                        className="w-full h-min rounded-xl p-1"
                        src="/images/assets/collappicon.svg"
                    />
                    <img
                        className="w-full h-min rounded-xl p-1"
                        src="/images/assets/collappicon.svg"
                    />
                    <img
                        className="w-full h-min rounded-xl p-1"
                        src="/images/assets/collappicon.svg"
                    />
                    <img
                        className="w-full h-min rounded-xl p-1"
                        src="/images/assets/collappicon.svg"
                    />
                </div>
            </div>

            <div className="flex flex-col mt-5 mb-2 pl-4 ">
                <span className="font-medium mb-1 text-2xl text-slate-100">
                    Collection Name
                </span>
                <span className="font-light text-sm text-slate-300">
                    Modified: <span className="font-medium">1m ago</span>
                </span>
            </div>
        </a>
    )
}

export default CollectionCard