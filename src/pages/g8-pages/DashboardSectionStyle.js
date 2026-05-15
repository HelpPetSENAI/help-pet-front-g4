import styled from "styled-components"

export const DashboardSectionStyle = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    gap: 1rem;

    font-family: var(--main-font);

    width: 100vw;
    height: 100vh;
    padding: 1rem;

    background-color: var(--clr-green-50);
`