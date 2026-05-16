import styled from "styled-components"

export const DashboardSectionStyle = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    column-gap: 1rem;
    row-gap: 0.5rem;

    font-family: var(--main-font);

    width: 100vdw;
    min-height: 100vh;
    padding: 1rem;

    background-color: var(--clr-green-50);
`