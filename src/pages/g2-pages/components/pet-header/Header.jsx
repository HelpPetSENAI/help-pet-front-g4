import * as S from "./style.js";
import HelpPetLogo from "../../assets/icons/HelpPetLogo.jsx";
import HelpPetLogoText from "../../assets/icons/HelpPetLogoText.jsx";
import LeftArrow from "../../assets/icons/LeftArrow.jsx";
import HamburguerIcon from "../../assets/icons/HamburguerIcon.jsx";

function Header({ IsHamburguer, onOpenSidebar }) {

    return (
        <S.PetHeader>
            <S.LogoContainer>
                <HelpPetLogo />
                <HelpPetLogoText />
            </S.LogoContainer>

            {IsHamburguer ? (
                <div onClick={onOpenSidebar} style={{ cursor: 'pointer', display: 'flex' }}>
                    <HamburguerIcon />
                </div>
            ) : (
                <div style={{cursor: 'pointer', display: 'flex'}}
                     onClick="history.back(); return false;">
                    <LeftArrow/>
                </div>
            )}
        </S.PetHeader>
    );
}

export default Header;