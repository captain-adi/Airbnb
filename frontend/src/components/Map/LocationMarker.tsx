import { Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect } from "react";

function LocationMarker() {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  // Listen for clicks on the map
  useMapEvents({
    click(e: { latlng: { lat: number; lng: number; }; }) {
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  // Pan the map to the marker when it changes
  useEffect(() => {
    if (markerPosition) {
      map.setView(markerPosition);
    }
  }, [markerPosition, map]);

  return markerPosition ? (
    <Marker position={markerPosition}>
      <Popup>📍 Marked Location<br />Lat: {markerPosition[0]}<br />Lng: {markerPosition[1]}</Popup>
    </Marker>
  ) : null;
}

export default LocationMarker;
