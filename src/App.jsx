/*import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ComingSoonPage from './pages/CommingSoonPage'
import NotFoundPage from './pages/NotFoundPage.jsx'
import GlobalStyle from './styles/GlobalStyle.js'
import ExamplePage from './pages/ExamplePage.jsx'
import MessagePageG6 from './pages/page-g6/MessagePageG6.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ComingSoonPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/coming-soon',
    element: <ComingSoonPage />
  },
  {
    path: '/example',
    element: <ExamplePage />
  },
  {
    path: '/message',
    element: <MessagePageG6 />
  },
])

export default function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  )
}*/
import React, { useState, useCallback } from "react";
import GlobalStyle from "./styles/GlobalStyle.js";
import ContainerSearchElement from "./components/inputSearch/containerSearch.jsx";
import MapComponent from "./components/map/Map.jsx";
import FilterModal from "./components/filter/FilterModal.jsx";
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" rel="stylesheet"></link>


export default function App() {
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
            <GlobalStyle />
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
    );
}
