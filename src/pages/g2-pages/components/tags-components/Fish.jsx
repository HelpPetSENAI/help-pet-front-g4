import styled from "styled-components";

function FishTag() {

    return(
        <Fish>
            <p>Peixe</p>
        </Fish>
    )
}

const Fish = styled.div`
    display: inline-flex;
    padding: 8px;
    align-items: center;
    gap: 8px;

    color: #4d1f0f;
    font-family: var(--main-font), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 51%;

    border-radius: 50px;
    background: #FF6B35;
`;

export default FishTag