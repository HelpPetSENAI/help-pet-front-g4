import Header from "./components/pet-header/Header.jsx";
import * as S from "./style.js";
import DonationCard from "./components/DonationCard/DonationCard.jsx";

function RegisterPetPage() {

    return (
        <S.Container>
            <Header/>

            <S.MainContent>
                <DonationCard />
            </S.MainContent>
        </S.Container>
    );
}

export default RegisterPetPage