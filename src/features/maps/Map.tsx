import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from './components/LocationMarker.tsx';

const Map = () => {
  const searchStreet = async (query) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`);
    const data = await response.json();
    console.log(data);
  };

  void searchStreet('Ден-сяопина');

  const position: [number, number] = [42.8761, 74.6001];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "92vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default Map;
