import { Marker, Popup, useMapEvents } from 'react-leaflet';
import React, { useState } from 'react';

const LocationMarker = () => {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Город в котором вы находитесь</Popup>
    </Marker>
  )
};

export default LocationMarker;