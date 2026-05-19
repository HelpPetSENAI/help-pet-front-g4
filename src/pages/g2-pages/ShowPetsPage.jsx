import Header from "./components/pet-header/Header.jsx";
import * as S from "./style.js";
import DonationCard from "./components/donation-card/DonationCard.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

function ShowPetPage() {

    const token = "";
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/donations/viewAll", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setDonations(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar doações:", error);
            });

    }, []);

    return (
        <S.Container>
            <Header/>
            <S.MainContent>
                {donations.map((donation) => (
                    <DonationCard
                        key={donation.id}
                        id={donation.id}
                        specie={donation.specie}
                        name={donation.name}
                        breed={donation.breed}
                        size={donation.size}
                        url={donation.photos && donation.photos.length > 0 ? donation.photos[0] : "https://via.placeholder.com/150"}
                    />
                ))}
            </S.MainContent>
        </S.Container>
    );
}

export default ShowPetPage