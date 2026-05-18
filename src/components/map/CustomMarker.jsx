import React, { useEffect, useRef, useCallback } from "react";
import styleCard from "../../components/style/AnimalCard.module.css";

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

const escapeHtml = (value) =>
    String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

const formatOptionalValue = (value, fallback = "Não informado") => {
    if (value === null || value === undefined || value === "") return fallback;
    return value;
};

const formatBoolean = (value, trueText, falseText) => {
    if (typeof value !== "boolean") return "Não informado";
    return value ? trueText : falseText;
};

const CustomMarker = ({
    map,
    position,
    type,
    animal,
    searchLocation,
    isSelected,
}) => {
    const markerRef = useRef(null);
    const infoWindowRef = useRef(null);

    const openInfoWindow = useCallback(() => {
        if (!map || !markerRef.current) return;

        if (infoWindowRef.current) {
            infoWindowRef.current.close();
        }

        let distanceText = "";

        if (searchLocation) {
            const distance = calculateDistance(
                searchLocation.lat,
                searchLocation.lng,
                position.lat,
                position.lng
            );

            distanceText = `
                <p><strong>Distância:</strong> ${distance.toFixed(2)} km</p>
            `;
        }

        const photo = escapeHtml(animal.photo || animal.image || animal.url);
        const name = escapeHtml(animal.name);
        const description = escapeHtml(animal.description);
        const typeLabel = escapeHtml(animal.typeLabel || (type === "cat" ? "Gato" : "Cachorro"));
        const breed = escapeHtml(formatOptionalValue(animal.raca));
        const age = escapeHtml(formatOptionalValue(animal.age));
        const gender = escapeHtml(formatOptionalValue(animal.sexo));
        const size = escapeHtml(formatOptionalValue(animal.porte));
        const weight = escapeHtml(
            animal.peso || animal.weight ? `${animal.peso || animal.weight} kg` : "Não informado"
        );
        const cep = escapeHtml(formatOptionalValue(animal.cep));
        const castrado = escapeHtml(formatBoolean(animal.castrado, "Sim", "Não"));
        const vacinado = escapeHtml(formatBoolean(animal.vacinado, "Em dia", "Pendente"));

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="${styleCard.card}">
                    <h2 class="${styleCard.title}">Lista de adoção</h2>

                    <div class="${styleCard.imageContainer}">
                        <img src="${photo}" alt="${name}" class="${styleCard.image}" />
                    </div>

                    <h3 class="${styleCard.name}">${name}</h3>

                    <p class="${styleCard.subtitle}">
                        ${typeLabel} • ${breed}
                    </p>

                    ${distanceText}

                    <ul class="${styleCard.details}">
                        <li><strong>Nome:</strong> ${name}</li>
                        <li><strong>Espécie:</strong> ${typeLabel}</li>
                        <li><strong>Raça:</strong> ${breed}</li>
                        <li><strong>Idade:</strong> ${age}</li>
                        <li><strong>Sexo:</strong> ${gender}</li>
                        <li><strong>Porte:</strong> ${size}</li>
                        <li><strong>Peso:</strong> ${weight}</li>
                        <li><strong>CEP:</strong> ${cep}</li>
                        <li><strong>Castrado:</strong> ${castrado}</li>
                        <li><strong>Vacinas:</strong> ${vacinado}</li>
                        <li><strong>Descrição:</strong> ${description}</li>
                    </ul>

                    <div class="${styleCard.actions}">
                        <button class="${styleCard.adoptBtn}">Adotar</button>
                    </div>
                </div>
            `,
        });

        infoWindow.addListener("domready", () => {
            const iwOuter = document.querySelector(".gm-style-iw");

            if (iwOuter) {
                iwOuter.style.background = "var(--clr-green-100)";
                iwOuter.style.border = "2px solid black";
                iwOuter.style.borderRadius = "10px";
                iwOuter.style.paddingBottom = "20px";
                iwOuter.style.paddingTop = "0px";
                iwOuter.style.paddingLeft = "5px";
                iwOuter.style.paddingRight = "5px";
            }

            const closeBtn = document.querySelector(".gm-ui-hover-effect");

            if (closeBtn) {
                const span = closeBtn.querySelector("span");

                if (span) {
                    span.style.filter = "invert(0)";
                }
            }
        });

        infoWindow.open(map, markerRef.current);
        infoWindowRef.current = infoWindow;
    }, [map, position, animal, type, searchLocation]);

    useEffect(() => {
        if (!map || !position) return;

        const emoji = type === "cat" ? "🐱" : "🐶";
        const bgColor = type === "cat" ? "#FF9800" : "#4CAF50";
        const fontFamily = "'Archivo', sans-serif";
        const markerName = escapeHtml(animal.name).slice(0, 10);

        const marker = new google.maps.Marker({
            map,
            position,
            icon: {
                url: `data:image/svg+xml,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
                        <circle cx="20" cy="20" r="18" fill="${bgColor}" stroke="white" stroke-width="2"/>
                        <text x="20" y="28" text-anchor="middle" font-size="24" fill="white" font-family="${fontFamily}">${emoji}</text>
                        <rect x="10" y="38" width="20" height="12" fill="white" rx="2" stroke="#ccc" stroke-width="1"/>
                        <text x="20" y="47" text-anchor="middle" font-size="10" fill="#333" font-family="${fontFamily}">${markerName}</text>
                    </svg>
                `)}`,
                scaledSize: new google.maps.Size(40, 50),
                anchor: new google.maps.Point(20, 40),
            },
            title: `${animal.name} - ${
                type === "cat" ? "Gato" : "Cachorro"
            } - ${animal.age}`,
        });

        markerRef.current = marker;

        marker.addListener("click", () => {
            openInfoWindow();
        });

        return () => {
            if (infoWindowRef.current) {
                infoWindowRef.current.close();
            }

            if (markerRef.current) {
                markerRef.current.setMap(null);
            }
        };
    }, [map, position, type, animal, openInfoWindow]);

    useEffect(() => {
        if (!isSelected || !map || !position) return;

        map.panTo(position);

        setTimeout(() => {
            map.setZoom(17);
            openInfoWindow();
        }, 300);
    }, [isSelected, map, position, openInfoWindow]);

    return null;
};

export default CustomMarker;
