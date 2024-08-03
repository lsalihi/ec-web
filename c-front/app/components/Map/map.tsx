"use client";

import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamFja2dhbmRlcmNvbXB0b24iLCJhIjoiY2x1bW16MmVzMTViajJqbjI0N3RuOGhhOCJ9.Kl6jwZjBEtGoM1C_5NyLJg';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });

    return () => map.remove();
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '100vh' }} />
  );
};

export default Map;
