import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};


function MapComponent({ trail }) {
  const { isLoaded } = useJsApiLoader({
    id: import.meta.env.VITE_GOOGLEMAPID,
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPAPIKEY
  })
  
  const center = {
    lat: Number(trail.lat),
    lng: Number(trail.lon)
  };

  const [map, setMap] = React.useState(null)

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle} 
        center={center} 
        zoom={12}
        onUnmount={onUnmount}
      >
        <Marker position={center}></Marker>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapComponent)