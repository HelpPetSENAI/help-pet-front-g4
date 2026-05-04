import styled from "styled-components";

function ReptilesTag() {

    return(
        <Reptiles>
            <p>Réptil</p>
        </Reptiles>
    )
}

const Reptiles = styled.div`
    display: inline-flex;
    padding: 8px;
    align-items: center;
    gap: 8px;

    color: #26400a;
    font-family: var(--main-font), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 51%;

    border-radius: 50px;
    background: #7ED321;
`;

export default ReptilesTag