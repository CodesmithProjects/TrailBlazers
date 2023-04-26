import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  height: "400px",
  borderRadius: "5px",
};

interface Props {
  trail: Trail;
  
}

interface Trail {
  data: any[];
  name: string;
  length: number;
  difficulty: string,
  description: string,
  id: number;
  url: string;
  googleMapsURL: string;
  map: () => void;
  averageStars: number;
  numberOfReviews: number;
  city: string;
  lat:  number;
  lon: number;
}

export default function MapComponent({trail }: Props) {

//export const MapComponent: React.FC<Props> = () => {

//function MapComponent({ trail }) {
  const { isLoaded } = useJsApiLoader({
    id: import.meta.env.VITE_GOOGLEMAPID,
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPAPIKEY,
  });
  const center = {
    lat: Number(trail.lat),
    lng: Number(trail.lon),
  };

  const [map, setMap] = React.useState(null);
//PICK BACK UP TOMORROW OM WHAT TYPE MAP SHOULD BE
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onUnmount={onUnmount}
    >
      <Marker position={center}></Marker>
    </GoogleMap>
  ) : (
    <></>
  );
}

//export default React.memo(MapComponent);
