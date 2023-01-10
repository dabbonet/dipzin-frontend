import React from 'react'
import CollectionCard from './components/collectionCard'

const Collections = () => {
    return (
        <div className="w-[80%] lg:w-[75%] grid lg:grid-cols-4 lg:gap-5 gap-5 mb-10 grid-cols-1 pb-32">
            <CollectionCard />
            <CollectionCard />
            <CollectionCard />
            <CollectionCard />
            <CollectionCard />
            <CollectionCard />
        </div>
    )
}

export default Collections