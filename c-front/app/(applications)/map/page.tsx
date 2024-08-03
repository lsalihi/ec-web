import React from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../components/Map/map'), { ssr: false });

const MapPage = () => {
  return (
    <div>
      <Map />
    </div>
  );
};

export default MapPage;
