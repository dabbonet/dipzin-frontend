import React from 'react'

const CollectionCard = () => {
    return (
        <div className="relative mb-7 bg-slate-800 rounded-2xl p-3">
            <div className="flex mr-4 ml-4 space-y-4">
                <img
                    className="max-h-20 w-full rounded-xl"
                    src="/images/assets/collappicon.svg"
                />
                <img
                    className="max-h-20 w-full rounded-xl"
                    src="/images/assets/collappicon.svg"
                />
            </div>
            <div className="  mr-4 ml-4 space-y-4">
                <img
                    className="max-h-20 w-full rounded-xl"
                    src="/images/assets/collappicon.svg"
                />
                <img
                    className="max-h-20 w-full rounded-xl"
                    src="/images/assets/collappicon.svg"
                />
                <img
                    className="max-h-20 w-full rounded-xl"
                    src="/images/assets/collappicon.svg"
                />
                <img
                    className="max-h-20 w-full rounded-xl"
                    src="/images/assets/collappicon.svg"
                />
            </div>
            <div className="text-white flex flex-col mt-5 pl-5">
                <span className="font-medium mb-1 text-xl">
                    Collection Name
                </span>
                <span className="font-light">
                    Modified: <span className="font-medium">1m ago</span>
                </span>
            </div>
        </div>
    )
}

export default CollectionCard