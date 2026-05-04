import styled from "styled-components";

function CatTag() {

    return(
        <Cat>
            <p>Gato</p>
        </Cat>
    )
}

const Cat = styled.div`
    display: inline-flex;
    padding: 8px;
    align-items: center;
    gap: 8px;

    color: var(--clr-neutral-100, #FFF);
    font-family: var(--main-font), sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 51%;
    
    border-radius: 50px;
    background: var(--clr-blue-500, #2828C9);
`;

export default CatTag