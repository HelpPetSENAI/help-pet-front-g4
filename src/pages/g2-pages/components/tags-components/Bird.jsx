import styled from "styled-components";

function BirdTag() {

    return(
        <Bird>
            <p>Pássaro</p>
        </Bird>
    )
}

const Bird = styled.div`
    display: inline-flex;
    padding: 8px;
    align-items: center;
    gap: 8px;

    color: var(--clr-cyan-900, #074040);
    font-family: var(--main-font), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 51%;
    
    border-radius: 50px;
    background: var(--clr-cyan-500, #18DEDE);
`;

export default BirdTag