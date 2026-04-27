import styled from "styled-components";

export const StyledDashboardCard = styled.div`
    grid-column: span ${props => props.$colSpan};
    grid-row: span ${props => props.$rowSpan};

    padding: 1rem;

    background-color: var(--clr-neutral-100);
    border: 4px solid var(--clr-red-1000);
    border-radius: 15px;
`