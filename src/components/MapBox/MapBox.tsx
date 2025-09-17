import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoidnVjb2RpaW5nIiwiYSI6ImNrdzBmcG8yeTFianUydnBhZHpmcXEzbzkifQ.RD1KCg_JbWOMCB_CL8pS4g';

export default function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // tránh init nhiều lần
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // kiểu bản đồ
      center: [105.854444, 21.028511], // [lng, lat] (Hà Nội)
      zoom: 12,
    });

    // Thêm navigation control
    map.current.addControl(new mapboxgl.NavigationControl());
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
}
