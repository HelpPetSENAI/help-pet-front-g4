import styled from "styled-components";

function CnidariaTag() {

    return(
        <Cnidaria>
            <p>Cnidário</p>
        </Cnidaria>
    )
}

const Cnidaria = styled.div`
    display: inline-flex;
    padding: 8px;
    align-items: center;
    gap: 8px;

    color: #004037;
    font-family: var(--main-font), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 51%;

    border-radius: 50px;
    background: #00B89F;
`;

export default CnidariaTag