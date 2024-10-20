import React from 'react';
import collectionsData from './_static/collections.json';
import Collection from './_components/collection';

const MyCollectionsPage: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {collectionsData.map((collection) => (
      <Collection key={collection.id} collection={collection} />
    ))}
  </div>
);

export default MyCollectionsPage;
