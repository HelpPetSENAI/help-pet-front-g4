import React, { useState } from "react";
import styled from "styled-components";
import searchIcon from "../../assets/icons/search-icon.svg";
import filterIcon from "../../assets/icons/options-icon.svg";
import GlobalStyle from "../../styles/GlobalStyle.js";

const SearchContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    border: 2px solid var(--clr-green-800);
    background: var(--clr-green-100);
    box-shadow: 2px 2px 0 0 var(--clr-neutral-1000);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
`

const ButtonSearch = styled.button`
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
`

const LeftContainer = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
`

const ContainerSearchElement = styled.input`
    width: 100%;
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    height: auto;
    background: none;
    border: none;
    outline: none;

    &::placeholder {
        color: #000;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
    }
`

const FilterSearch = styled.button`
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
`

export default function ContainerSearch({ map, onSearch, onFilterClick }) {
    const [valor, setValor] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    async function handleSearch() {
        if (!valor || !map || isSearching) {
            console.log("Busca bloqueada:", {valor: !!valor, map: !!map, isSearching});
            return;
        }

        setIsSearching(true);
        console.log("Buscando endereço:", valor);

        try {
            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({address: valor, region: "br"}, (results, status) => {
                console.log("Status da geocodificação:", status);

                if (status === "OK" && results && results[0]) {
                    const location = results[0].geometry.location;

                    const lat = location.lat();
                    const lng = location.lng();

                    console.log("Localização encontrada:", {lat, lng});


                    const searchLocation = {lat: lat, lng: lng};


                    if (onSearch) {
                        onSearch(searchLocation);
                    }

                    const marker = new window.google.maps.Marker({
                        map: map, position: searchLocation, icon: {
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                            scaledSize: new window.google.maps.Size(32, 32)
                        }, title: `Busca: ${valor}`
                    });


                    setTimeout(() => {
                        marker.setMap(null);
                    }, 5000);

                } else {
                    console.error("Erro na geocodificação:", status);
                    alert("Endereço não encontrado. Por favor, tente novamente.");
                }

                setIsSearching(false);
            });
        } catch (error) {
            console.error("Erro na busca:", error);
            alert("Erro ao buscar endereço. Verifique sua conexão.");
            setIsSearching(false);
        }
    }

    return (<SearchContainer>
        <LeftContainer>
            <ButtonSearch onClick={handleSearch} disabled={isSearching}>
                <img src={searchIcon} alt="Botão de pesquisa"/>
            </ButtonSearch>

            <ContainerSearchElement
                placeholder="Digite seu endereço"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
            />
        </LeftContainer>

        <FilterSearch onClick={onFilterClick}>
            <img src={filterIcon} alt="Filtro"/>
        </FilterSearch>
    </SearchContainer>);
}