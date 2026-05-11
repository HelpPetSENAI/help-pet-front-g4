import styled from "styled-components";
import SpecieTag from "../tags-components/SpecieTag.jsx";

function DonationCard({url, name, size, breed, specie}) {

    return (
        <CardContainer>
            <TagWrapper>
                <SpecieTag specie={specie}/>
            </TagWrapper>
            <PetImgContainer src={url} alt={`${name}-photo`}/>
            <CardDescription>
                <h2>{name}</h2>
                <CardDescriptionWrapper>
                    <p>{size}</p>
                    <p>{breed}</p>
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
    height: 152px;
    gap: 10px;
    align-self: stretch;
    object-fit: cover;
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