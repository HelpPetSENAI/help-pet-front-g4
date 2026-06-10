import React, { useState, useCallback } from "react";
import ContainerSearchElement from "./components/inputSearch/containerSearch.jsx";
import MapComponent from "./components/map/Map.jsx";
import FilterModal from "./components/filter/FilterModal.jsx";

const LocationsPage = () => {
    
    const [map, setMap] = useState(null);
    const [searchLocation, setSearchLocation] = useState(null);
    const [filters, setFilters] = useState({
        distanciaMax: 5,
        tipoAnimal: "",
        idade: "",
        raca: "",
        temperamento: [],
        porte: "",
        sexo: "",
        vacinado: "",
        castrado: "",
    });
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const handleSearch = useCallback((location) => {
        setSearchLocation(location);
    }, []);

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };


    return (
        <>
            <ContainerSearchElement
                map={map}
                onSearch={handleSearch}
                onFilterClick={() => setIsFilterModalOpen(true)}
            />
            <MapComponent
                setMap={setMap}
                searchLocation={searchLocation}
                filters={filters}
            />
            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={handleApplyFilters}
                initialFilters={filters}
            />
        </>
    )
}

export default LocationsPage