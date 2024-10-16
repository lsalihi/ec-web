"use client";

import React, { useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from '../Home/Header';
import { FaSearch, FaPlus, FaMinus, FaChargingStation } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

interface ChargingStation {
  id: string;
  name: string;
  type: string;
  capacity: number;
  status: string;
  street: string;
  streetNumber: string;
  city: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
}

const Map = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chargingStations, setChargingStations] = useState<ChargingStation[]>([]);
  const [userCoordinates, setUserCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [newStationMarker, setNewStationMarker] = useState<mapboxgl.Marker | null>(null);
  const searchParams = useSearchParams();

  const MapKey = process.env.NEXT_PUBLIC_MAP_BOX_KEY;

  const fetchChargingStations = useCallback(async () => {
    try {
      const response = await fetch('/api/charging-stations');
      const data = await response.json();
      setChargingStations(data);
    } catch (error) {
      console.error('Error fetching charging stations:', error);
    }
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = `${MapKey}`;
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });

    setMap(mapInstance);

    // Fetch charging stations data
    fetchChargingStations();

    return () => mapInstance.remove();
  }, [MapKey, fetchChargingStations]);

  useEffect(() => {
    if (map && chargingStations.length > 0) {
      addMarkersToMap();
    }
  }, [map, chargingStations]);

  useEffect(() => {
    if (map && userCoordinates) {
      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([userCoordinates.lng, userCoordinates.lat])
        .addTo(map);
    }
  }, [map, userCoordinates]);

  useEffect(() => {
    if (map) {
      const lat = searchParams.get('lat');
      const lng = searchParams.get('lng');
      if (lat && lng) {
        const newLat = parseFloat(lat);
        const newLng = parseFloat(lng);
        map.flyTo({ center: [newLng, newLat], zoom: 15 });
        addNewStationMarker(newLat, newLng);
      }
    }
  }, [map, searchParams]);

  const addMarkersToMap = () => {
    if (!map) return;

    // Remove existing markers
    const existingMarkers = document.getElementsByClassName('mapboxgl-marker');
    while (existingMarkers[0]) {
      existingMarkers[0].remove();
    }

    chargingStations.forEach((station) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([station.coordinates.lng, station.coordinates.lat])
        .addTo(map);

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `
        <div>
          <h3>${station.name}</h3>
          ${station.image ? `<img src="${station.image}" alt="${station.name}" style="width: 100%; max-width: 200px;" />` : ''}
          <p>Type: ${station.type}</p>
          <p>Capacity: ${station.capacity}</p>
          <p>Status: ${station.status}</p>
          <p>Address: ${station.streetNumber} ${station.street}, ${station.city}, ${station.postalCode}</p>
        </div>
        `
      );

      marker.setPopup(popup);
    });
  };

  const addNewStationMarker = async (lat: number, lng: number) => {
    if (!map) return;

    // Remove existing new station marker
    if (newStationMarker) {
      newStationMarker.remove();
    }

    // Fetch the new station data
    try {
      const response = await fetch(`/api/charging-stations?lat=${lat}&lng=${lng}`);
      const newStation: ChargingStation = await response.json();

      const marker = new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat([lng, lat])
        .addTo(map);

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `
        <div>
          <h3>${newStation.name}</h3>
          ${newStation.image ? `<img src="${newStation.image}" alt="${newStation.name}" style="width: 100%; max-width: 200px;" />` : ''}
          <p>Type: ${newStation.type}</p>
          <p>Capacity: ${newStation.capacity}</p>
          <p>Status: ${newStation.status}</p>
          <p>Address: ${newStation.streetNumber} ${newStation.street}, ${newStation.city}, ${newStation.postalCode}</p>
        </div>
        `
      );

      marker.setPopup(popup);
      setNewStationMarker(marker);
    } catch (error) {
      console.error('Error fetching new station data:', error);
    }
  };

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
    <div className='flex flex-col h-screen w-screen overflow-hidden'>
      <Header setCoordinates={setUserCoordinates} />
      <div className="relative h-[calc(100vh-64px)]">
        {/* Search bar */}
        <div className="absolute top-4 left-4 right-4 z-10 md:left-auto md:right-4 md:w-72">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div id="map" className="w-full h-full" />

        <div className="absolute bottom-4 right-4 z-10 flex flex-col space-y-2">
          <div className="flex space-x-2">
            <button
              onClick={handleZoomIn}
              className="p-2 bg-white text-black rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaPlus />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 bg-white text-black rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaMinus />
            </button>
          </div>
          <button
            onClick={handleListChargePoint}
            className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 flex items-center justify-center"
          >
            <FaChargingStation className="mr-2" />
            <span className="hidden md:inline">Add New Charging Point</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
