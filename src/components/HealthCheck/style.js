import styled from "styled-components";


export const StyledHealthCheck = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-family: var(--main-font);

    > p {
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 80%);
    }
`

export const StyledTitle = styled.h3`
    font-weight: 600;
    font-size: 20px;
`

export const StyledStatusWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    h4 {
        font-size: 18px;
        font-weight: 500;
    }
`

export const StyledStatus = styled.p`
    padding: 8px;
    
    font-size: 16px;
    text-transform: uppercase;
    
    border-radius: 7.5px;
    color: var(--clr-neutral-100);
    background-color: ${props => props.$isSucessful ? 'var(--clr-green-500)' : 'var(--clr-red-500)'};
`