import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

interface IMapProps {
  coordinates: [number, number]; // [lat, lng]
}

export default function Map({ coordinates }: IMapProps) {
  // Use coordinates prop as the initial and current marker position
  const [markerPosition, setMarkerPosition] = useState<[number, number]>(coordinates);

  // If coordinates prop changes, update marker position
  useEffect(() => {
    setMarkerPosition(coordinates);
  }, [coordinates]);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={markerPosition}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />
        <Recenter position={markerPosition} />
      </MapContainer>
    </div>
  );
}

function LocationMarker({
  markerPosition,
  setMarkerPosition,
}: {
  markerPosition: [number, number];
  setMarkerPosition: (pos: [number, number]) => void;
}) {
  useMapEvents({
    click(e: { latlng: { lat: number; lng: number; }; }) {
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return (
    <Marker position={markerPosition}>
      <Popup>
        📍 Marked Location<br />
        Lat: {markerPosition[0]}
        <br />
        Lng: {markerPosition[1]}
      </Popup>
    </Marker>
  );
}

function Recenter({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}
