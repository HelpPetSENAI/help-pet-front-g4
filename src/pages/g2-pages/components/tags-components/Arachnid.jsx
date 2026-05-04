import styled from "styled-components";

function ArachnidTag() {

    return(
        <Arachnid>
            <p>Aracnídeo</p>
        </Arachnid>
    )
}

const Arachnid = styled.div`
    display: inline-flex;
    padding: 8px;
    align-items: center;
    gap: 8px;

    color: var(--clr-yellow-900, #3E3609);
    font-family: var(--main-font), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 51%;
    
    border-radius: 50px;
    background: var(--clr-yellow-500, #E0C528);
`;

export default ArachnidTag