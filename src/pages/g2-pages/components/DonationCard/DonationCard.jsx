import styled from "styled-components";
import DogTag from "../tags-components/Dog.jsx";

function DonationCard() {

    return (
        <CardContainer>
            <TagWrapper>
                <DogTag/>
            </TagWrapper>
            <PetImgContainer>
            {/*  Foto  */}
            </PetImgContainer>
            <CardDescription>
                <h2>Nome do Pet</h2>
                <CardDescriptionWrapper>
                    <p>Porte</p>
                    <p>Raça</p>
                    <p>Localização (em km)</p>
                </CardDescriptionWrapper>
            </CardDescription>
        </CardContainer>
    );
}

export const CardContainer = styled.div`
    position: relative;
    display: flex;
    width: 315px;
    padding: 16px;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
    font-family: var(--main-font), sans-serif;

    border-radius: 20px;
    border: 2px solid var(--crl-red-1000, #160404);
    background: var(--crl-neutral-100, #FFF);

    box-shadow: 2px 2px 0 0 var(--crl-red-1000, #160404);
`;

export const PetImgContainer = styled.img`
    display: flex;
    height: 152px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    border-radius: 12px;
    border: 2px solid var(--crl-neutral-1000, #000);
    background: var(--crl-neutral-200, #E3E3E3);
`;

export const CardDescription = styled.div`
    display: flex;
    padding: 0 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    align-self: stretch;
`;

export const CardDescriptionWrapper = styled.div`
    display: flex;
    gap: 8px;
`;

export const TagWrapper = styled.div`
    position: absolute;
    right: 22px;
    top: -12px;
`;


export default DonationCard