import React, { useState, useCallback, useEffect, useMemo } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import CustomMarker from "./CustomMarker";
import { MapComponent } from "../map/MapComponent";

const LIBRARIES = ["marker"];

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

export default function MapComponent({ setMap, searchLocation, filters }) {
    const [mapInstance, setMapInstance] = useState(null);

    const containerStyle = {
        width: "100%",
        height: "100vh",
    };

    const center = {
        lat: -23.55052,
        lng: -46.633308,
    };

    // Filtra os animais com base nos filtros e na distância máxima (se houver searchLocation)
    const filteredAnimals = useMemo(() => {
        let filtered = [...mockAnimals];

        // Filtro por tipo
        if (filters.tipoAnimal) {
            filtered = filtered.filter((animal) => animal.type === filters.tipoAnimal);
        }

        // Filtro por idade (compara string exata)
        if (filters.idade) {
            filtered = filtered.filter((animal) => animal.age === filters.idade);
        }

        // Filtro por raça (contém)
        if (filters.raca) {
            filtered = filtered.filter((animal) =>
                animal.raca.toLowerCase().includes(filters.raca.toLowerCase())
            );
        }

        // Filtro por temperamento (pelo menos um dos selecionados)
        if (filters.temperamento.length > 0) {
            filtered = filtered.filter((animal) =>
                filters.temperamento.some((temp) => animal.temperamento.includes(temp))
            );
        }

        // Filtro por porte
        if (filters.porte) {
            filtered = filtered.filter((animal) => animal.porte === filters.porte);
        }

        // Filtro por sexo
        if (filters.sexo) {
            filtered = filtered.filter((animal) => animal.sexo === filters.sexo);
        }

        // Filtro por vacinado
        if (filters.vacinado) {
            const isVacinado = filters.vacinado === "sim";
            filtered = filtered.filter((animal) => animal.vacinado === isVacinado);
        }

        // Filtro por castrado
        if (filters.castrado) {
            const isCastrado = filters.castrado === "sim";
            filtered = filtered.filter((animal) => animal.castrado === isCastrado);
        }

        // Filtro por distância (se houver searchLocation)
        if (searchLocation && filters.distanciaMax !== undefined) {
            filtered = filtered.filter((animal) => {
                const distance = calculateDistance(
                    searchLocation.lat,
                    searchLocation.lng,
                    animal.lat,
                    animal.lng
                );
                return distance <= filters.distanciaMax;
            });
        }

        return filtered;
    }, [filters, searchLocation]);

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
                options={{
                    disableDefaultUI: false,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    rotateControl: true,
                    fullscreenControl: true,
                }}
            >
                {mapInstance &&
                    filteredAnimals.map((animal) => (
                        <CustomMarker
                            key={animal.id}
                            map={mapInstance}
                            position={{ lat: animal.lat, lng: animal.lng }}
                            type={animal.type}
                            animal={animal}
                            searchLocation={searchLocation} // passa a localização pesquisada para calcular distância
                        />
                    ))}
            </GoogleMap>
        </LoadScript>
    );
}