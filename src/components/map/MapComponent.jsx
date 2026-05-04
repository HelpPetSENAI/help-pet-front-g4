import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import CustomMarker from "./CustomMarker";

const LIBRARIES = ["marker"];

export default function MapComponent({ setMap, searchLocation, filters }) {
  const [mapInstance, setMapInstance] = useState(null);
  const [animals, setAnimals] = useState([]);

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: -23.55052,
    lng: -46.633308,
  };

  // Buscar animais da API com filtros
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const query = new URLSearchParams(filters).toString();
        const response = await fetch(`/donations/viewAll?${query}`);
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        console.error("Erro ao buscar animais:", error);
      }
    };

    fetchAnimals();
  }, [filters]);

  // Centraliza o mapa quando uma nova localização é pesquisada
  useEffect(() => {
    if (searchLocation && mapInstance) {
      mapInstance.setCenter({ lat: searchLocation.lat, lng: searchLocation.lng });
      mapInstance.setZoom(16);
    }
  }, [searchLocation, mapInstance]);

  const handleMapLoad = useCallback(
    (map) => {
      setMapInstance(map);
      setMap(map);
    },
    [setMap]
  );

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={LIBRARIES}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={handleMapLoad}
      >
        {mapInstance &&
          animals.map((animal) => (
            <CustomMarker
              key={animal.id}
              map={mapInstance}
              position={{ lat: animal.latitude, lng: animal.longitude }}
              type={animal.tipoAnimal}
              animal={animal}
              searchLocation={searchLocation}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
}
