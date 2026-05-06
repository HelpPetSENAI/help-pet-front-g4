import * as S from "./style.js";
import HelpPetLogo from "../../assets/icons/HelpPetLogo.jsx";
import HelpPetLogoText from "../../assets/icons/HelpPetLogoText.jsx";
import LeftArrow from "../../assets/icons/LeftArrow.jsx";

function Header() {

    return (
        <S.PetHeader>
            <S.LogoContainer>
                <HelpPetLogo />
                <HelpPetLogoText />
            </S.LogoContainer>
            <LeftArrow />
        </S.PetHeader>
    );
}

export default Header;