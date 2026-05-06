import styled from "styled-components";

function AmphibianTag() {

    return(
        <Amphibian>
            <p>Anfíbio</p>
        </Amphibian>
    )
}

const Amphibian = styled.div`
    display: inline-flex;
    padding: 8px;
    align-items: center;
    gap: 8px;

    color: var(--clr-green-900, #103713);
    font-family: var(--main-font), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 51%;
    
    border-radius: 50px;
    background: var(--clr-green-500, #39C442);
`;

export default AmphibianTag