    import React, { useEffect, useRef } from "react";
    import style from "../../components/style/CustomMarker.module.css";
    import styleCard from "../../components/style/AnimalCard.module.css";
    import GlobalStyle from "../../styles/GlobalStyle";

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

    const CustomMarker = ({ map, position, type, animal, searchLocation }) => {
        const markerRef = useRef(null); 

        useEffect(() => {
            if (!map || !position) return;

            const markerDiv = document.createElement("div");
            const emoji = type === "cat" ? "🐱" : "🐶";
            const bgColor = type === "cat" ? "#FF9800" : "#4CAF50";

            const fontFamily = "'Archivo', sans-serif";

            markerDiv.innerHTML = `
                <div class="${style.markerContainer}">
                    <div class="${style.markerEmoji}"">
                        ${emoji}
                    </div>
                    <div class="${style.markerLabel}">
                        ${animal.name}
                    </div>
                </div>
            `;

            const innerDiv = markerDiv.querySelector('div > div');
            markerDiv.addEventListener('mouseenter', () => {
                if (innerDiv) innerDiv.style.transform = 'scale(1.1)';
            });
            markerDiv.addEventListener('mouseleave', () => {
                if (innerDiv) innerDiv.style.transform = 'scale(1)';
            });

            const marker = new google.maps.Marker({
                map,
                position,
                icon: {
                    // SVG com fonte também definida
                    url: `data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
                            <circle cx="20" cy="20" r="18" fill="${bgColor}" stroke="white" stroke-width="2"/>
                            <text x="20" y="28" text-anchor="middle" font-size="24" fill="white" font-family="${fontFamily}">${emoji}</text>
                            <rect x="10" y="38" width="20" height="12" fill="white" rx="2" stroke="#ccc" stroke-width="1"/>
                            <text x="20" y="47" text-anchor="middle" font-size="10" fill="#333" font-family="${fontFamily}">${animal.name}</text>
                        </svg>
                    `)}`,
                    scaledSize: new google.maps.Size(40, 50),
                    anchor: new google.maps.Point(20, 40),
                },
                title: `${animal.name} - ${type === "cat" ? "Gato" : "Cachorro"} - ${animal.age}`,
            });

            let distanceText = "";
            if (searchLocation) {
                const distance = calculateDistance(
                    searchLocation.lat,
                    searchLocation.lng,
                    position.lat,
                    position.lng
                );
                distanceText = `<p><strong>Distância:</strong> ${distance.toFixed(2)} km</p>`;
            }

            marker.addListener("click", () => {
                const infoWindow = new google.maps.InfoWindow({
                    content: `
        <div class="${styleCard.card}">
        <h2 class="${styleCard.title}">Lista de adoção</h2>
        <div class="${styleCard.imageContainer}">
            <img src="${animal.photo}" alt="${animal.name}" class="${styleCard.image}" />
        </div>
        <h3 class="${styleCard.name}">${animal.name}</h3>
        <p class="${styleCard.subtitle}">${animal.temperamento.join(" e ")}</p>
        <ul class="${styleCard.details}">
            <li><strong>Nome:</strong> ${animal.name}</li>
            <li><strong>Idade:</strong> ${animal.age}</li>
            <li><strong>Sexo:</strong> ${animal.sexo === "macho" ? "Macho" : "Fêmea"}</li>
            <li><strong>Peso:</strong> ${animal.peso} kg</li>
            <li><strong>Altura:</strong> ${animal.altura} cm</li>
            <li><strong>Olhos:</strong> ${animal.olhos}</li>
            <li><strong>Castrado:</strong> ${animal.castrado ? "Sim" : "Não"}</li>
            <li><strong>Vacinas:</strong> ${animal.vacinado ? "Em dia" : "Pendentes"}</li>
        </ul>
        <div class="${styleCard.actions}">
            <button class="${styleCard.backBtn}">Voltar</button>
            <button class="${styleCard.adoptBtn}">Adotar</button>
        </div>
        </div>
    `,
                });
               infoWindow.addListener("domready", () => {
  // Seleciona o container principal do InfoWindow
  const iwOuter = document.querySelector(".gm-style-iw");
  if (iwOuter) {
    iwOuter.style.background = "var(--clr-green-100)";
    iwOuter.style.border = "2px solid black";
    iwOuter.style.borderRadius = "10px";
    iwOuter.style.paddingBottom = "20px"; // ajusta o espaço inferior
    iwOuter.style.paddingTop = "0px"; // ajusta o espaço superior
    iwOuter.style.paddingLeft = "5px";
    iwOuter.style.paddingRight = "5px";

  }

  // Seleciona o botão de fechar (X)
  const closeBtn = document.querySelector(".gm-ui-hover-effect");
  if (closeBtn) {
    //deixa o ícone X branco
    const span = closeBtn.querySelector("span");
    if (span) {
      span.style.filter = "invert(0)"; // mantém o ícone original (preto)
   }
  }
});

                infoWindow.open(map, marker);
            });
            

            markerRef.current = marker;

            return () => {
                if (markerRef.current) markerRef.current.setMap(null);
            };
        }, [map, position, type, animal, searchLocation]);

        return null;
    };

    export default CustomMarker;