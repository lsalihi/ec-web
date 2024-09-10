"use client";

import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from '../Home/Header';

//reactmapgl try it if not working

const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const MapKey = process.env.NEXT_PUBLIC_MAP_BOX_KEY;

  useEffect(() => {
    mapboxgl.accessToken = `${MapKey}`;
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleListChargePoint = () => {
    window.location.href = '/ListChargePoint';
  };

  const handleZoomIn = () => {
    if (map) {
      map.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.zoomOut();
    }
  };

  return (
    <div className='h-screen w-screen overflow-hidden'>
      <Header />
      <div className="relative h-[calc(100vh-50px)]">
        <div className="absolute top-4 right-[180px] z-10 flex">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div id="map" className="w-full h-full" />
        <div className="absolute bottom-[90px] right-[180px] z-10 flex flex-col space-y-2">
          <div className='flex justify-center items-center'> 
            <button
              onClick={handleZoomIn}
              className="p-2 bg-white text-black rounded-md w-[50px]"
            >
              +
            </button>
          </div>
          <div className='flex justify-center items-center'> 
            <button
              onClick={handleZoomOut}
              className="p-2 bg-white text-black rounded-md w-[50px]"
            >
              -
            </button>
          </div>
          <button
            onClick={handleListChargePoint}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Add New Charging Point
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;