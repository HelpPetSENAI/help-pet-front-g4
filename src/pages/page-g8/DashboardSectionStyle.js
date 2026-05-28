import styled from "styled-components"

export const DashboardSectionStyle = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 150px;
    gap: 1rem;
    
    font-family: var(--main-font);
    
    width: 100%;
    min-height: 100vh;
    padding: 1rem;
    
    background-color: var(--clr-green-50);

    @media(min-width: 700px) {
        grid-template-columns: 1fr 1fr;
    }
    
    @media(min-width: 1080px) {
        grid-template-columns: 1fr 2fr 1fr 1fr;
    }
`