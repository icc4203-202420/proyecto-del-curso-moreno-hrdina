import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

const MapComponent = () => {
  const mapRef = useRef(null);
  const markerCluster = useRef(null);
  const [bars, setBars] = useState([]);

  // Fetch bars data from backend
  useEffect(() => {
    const fetchBars = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/bars`);
        const data = await response.json();

        if (data && Array.isArray(data.bars)) {
          setBars(data.bars);
        } else {
          console.error('Data is not in the expected format:', data);
        }
      } catch (error) {
        console.error('Error fetching bars data:', error);
      }
    };

    fetchBars();
  }, []);

  // Initialize and update the map
  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
      version: 'weekly',
    });

    loader.importLibrary('maps').then((lib) => {
      const { Map } = lib;
      const map = new Map(mapRef.current, {
        mapId: 'DEMO_MAP_ID',
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });

      // Clear existing markers if any
      if (markerCluster.current) {
        markerCluster.current.clearMarkers();
      }

      loader.importLibrary('marker').then((lib) => {
        const { AdvancedMarkerElement, PinElement } = lib;

        // Create markers
        const markers = bars.map((bar) => {
          const pin = new PinElement();
          pin.glyph = bar.name;
          pin.background = "#ffaa00"; // Customize pin color

          const position = { lat: bar.latitude, lng: bar.longitude };
          const marker = new AdvancedMarkerElement({
            position,
            content: pin.element,
          });

          // Add click listener to navigate to bar's events page
          marker.addListener('click', () => {
            window.location.href = `/bars/${bar.id}/events`;
          });

          return marker;
        });

        // Initialize MarkerClusterer without imagePath
        markerCluster.current = new MarkerClusterer({map, markers});
      });
    });
  }, [bars]);

  return <div ref={mapRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default MapComponent;
