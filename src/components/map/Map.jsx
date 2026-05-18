import React, { useState, useCallback, useEffect, useMemo } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import CustomMarker from "./CustomMarker";
import { getDonations } from "../../services/donationApi";
import { normalizeDonation } from "../../services/donationMapper";

const LIBRARIES = ["marker"];

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

const hasValidCoordinates = (animal) =>
    Number.isFinite(animal.lat) && Number.isFinite(animal.lng);

const isInAgeRange = (ageMonths, selectedRange) => {
    if (ageMonths === null || ageMonths === undefined || ageMonths === "") return true;

    const months = Number(ageMonths);

    if (!selectedRange || Number.isNaN(months)) return true;

    const ranges = {
        "0–2 meses": [0, 2],
        "2–4 meses": [2, 4],
        "4–6 meses": [4, 6],
        "6–12 meses": [6, 12],
        "1–2 anos": [12, 24],
        "2–5 anos": [24, 60],
        "5–8 anos": [60, 96],
        "8+ anos": [96, Infinity],
    };

    const range = ranges[selectedRange];
    if (!range) return true;

    const [min, max] = range;
    return months >= min && months <= max;
};

const geocodeCep = (geocoder, animal) =>
    new Promise((resolve) => {
        if (hasValidCoordinates(animal)) {
            resolve(animal);
            return;
        }

        if (!animal.cep) {
            resolve(animal);
            return;
        }

        geocoder.geocode(
            { address: `${animal.cep}, Brasil`, region: "br" },
            (results, status) => {
                if (status === "OK" && results?.[0]) {
                    const location = results[0].geometry.location;

                    resolve({
                        ...animal,
                        lat: location.lat(),
                        lng: location.lng(),
                    });
                    return;
                }

                console.warn("Não foi possível geocodificar o CEP do pet:", {
                    id: animal.id,
                    cep: animal.cep,
                    status,
                });

                resolve(animal);
            }
        );
    });

export default function MapComponent({ setMap, searchLocation, filters }) {
    const [mapInstance, setMapInstance] = useState(null);
    const [sheetHeight, setSheetHeight] = useState(260);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedAnimalId, setSelectedAnimalId] = useState(null);
    const [animalsFromApi, setAnimalsFromApi] = useState([]);
    const [animals, setAnimals] = useState([]);

    const containerStyle = {
        width: "100%",
        height: "100vh",
    };

    const center = {
        lat: -23.55052,
        lng: -46.633308,
    };

    useEffect(() => {
        let isMounted = true;

        const loadDonations = async () => {
            try {
                const donations = await getDonations();
                const normalizedDonations = donations
                    .map(normalizeDonation)
                    .filter((animal) => animal.isAvailable !== false);

                if (isMounted) {
                    setAnimalsFromApi(normalizedDonations);
                }
            } catch (error) {
                console.error("Erro ao carregar doações da API:", error);

                if (isMounted) {
                    setAnimalsFromApi([]);
                }
            }
        };

        loadDonations();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (!mapInstance || !window.google?.maps) return;

        let isMounted = true;
        const geocoder = new window.google.maps.Geocoder();

        const geocodeAnimals = async () => {
            const animalsWithCoordinates = await Promise.all(
                animalsFromApi.map((animal) => geocodeCep(geocoder, animal))
            );

            if (isMounted) {
                setAnimals(animalsWithCoordinates);
            }
        };

        geocodeAnimals();

        return () => {
            isMounted = false;
        };
    }, [animalsFromApi, mapInstance]);

    const filteredAnimals = useMemo(() => {
        let filtered = animals.filter(hasValidCoordinates);

        if (filters.tipoAnimal) {
            filtered = filtered.filter((animal) => animal.type === filters.tipoAnimal);
        }

        if (filters.idade) {
            filtered = filtered.filter((animal) =>
                isInAgeRange(animal.ageMonths, filters.idade)
            );
        }

        if (filters.raca) {
            filtered = filtered.filter((animal) =>
                animal.raca.toLowerCase().includes(filters.raca.toLowerCase())
            );
        }

        if (filters.temperamento.length > 0) {
            filtered = filtered.filter((animal) =>
                filters.temperamento.some((temp) =>
                    animal.temperamento.includes(temp)
                )
            );
        }

        if (filters.porte) {
            filtered = filtered.filter((animal) => animal.porte === filters.porte);
        }

        if (filters.sexo) {
            filtered = filtered.filter((animal) => animal.sexo === filters.sexo);
        }

        if (filters.vacinado) {
            const isVacinado = filters.vacinado === "sim";
            filtered = filtered.filter(
                (animal) =>
                    typeof animal.vacinado !== "boolean" ||
                    animal.vacinado === isVacinado
            );
        }

        if (filters.castrado) {
            const isCastrado = filters.castrado === "sim";
            filtered = filtered.filter(
                (animal) =>
                    typeof animal.castrado !== "boolean" ||
                    animal.castrado === isCastrado
            );
        }

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
    }, [animals, filters, searchLocation]);

    const nearbyAnimals = useMemo(() => {
        if (!searchLocation) return [];

        return filteredAnimals
            .map((animal) => ({
                ...animal,
                distance: calculateDistance(
                    searchLocation.lat,
                    searchLocation.lng,
                    animal.lat,
                    animal.lng
                ),
            }))
            .sort((a, b) => a.distance - b.distance);
    }, [filteredAnimals, searchLocation]);

    useEffect(() => {
        if (searchLocation && mapInstance) {
            mapInstance.setCenter({
                lat: searchLocation.lat,
                lng: searchLocation.lng,
            });
            mapInstance.setZoom(16);
        }
    }, [searchLocation, mapInstance]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;

            const newHeight = window.innerHeight - e.clientY;
            const minHeight = 120;
            const maxHeight = window.innerHeight * 0.75;

            setSheetHeight(Math.min(Math.max(newHeight, minHeight), maxHeight));
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    const handleMapLoad = useCallback(
        (map) => {
            setMapInstance(map);
            setMap(map);
        },
        [setMap]
    );

    const handleNearbyCardClick = (animal) => {
        if (!mapInstance) return;

        setSelectedAnimalId(animal.id);
        setSheetHeight(90);

        mapInstance.panTo({
            lat: animal.lat,
            lng: animal.lng,
        });

        setTimeout(() => {
            mapInstance.setZoom(17);
        }, 300);
    };

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
                            searchLocation={searchLocation}
                            isSelected={selectedAnimalId === animal.id}
                        />
                    ))}
            </GoogleMap>

            {searchLocation && (
                <div
                    style={{
                        position: "fixed",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: `${sheetHeight}px`,
                        background: "var(--clr-green-100)",
                        borderTop: "2px solid #000",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        onMouseDown={() => setIsDragging(true)}
                        style={{
                            height: "32px",
                            cursor: "ns-resize",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <div
                            style={{
                                width: "50px",
                                height: "5px",
                                background: "#ccc",
                                borderRadius: "999px",
                            }}
                        />
                    </div>

                    <div
                        style={{
                            padding: "0 16px 16px",
                            overflowY: "auto",
                            flex: 1,
                        }}
                    >
                        <h3 style={{ margin: "0 0 12px" }}>
                            Pets mais próximos
                        </h3>

                        {nearbyAnimals.length === 0 ? (
                            <p>Nenhum pet encontrado próximo dessa localização.</p>
                        ) : (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                                    gap: "12px",
                                }}
                            >
                                {nearbyAnimals.map((animal) => (
                                    <button
                                        key={animal.id}
                                        onClick={() => handleNearbyCardClick(animal)}
                                        style={{
                                            border: "1px solid #000",
                                            background: "#fff",
                                            borderRadius: "16px",
                                            padding: "10px",
                                            textAlign: "left",
                                            cursor: "pointer",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                        }}
                                    >
                                        {animal.image && (
                                            <img
                                                src={animal.image}
                                                alt={animal.name}
                                                style={{
                                                    width: "100%",
                                                    height: "90px",
                                                    objectFit: "cover",
                                                    borderRadius: "12px",
                                                    marginBottom: "8px",
                                                }}
                                            />
                                        )}

                                        <strong>{animal.name}</strong>

                                        <p style={{ margin: "4px 0", fontSize: "13px" }}>
                                            {animal.typeLabel} • {animal.raca}
                                        </p>

                                        <small>{animal.distance.toFixed(2)} km de distância</small>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </LoadScript>
    );
}
