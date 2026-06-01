// Importando a função styled da biblioteca
import styled from "styled-components"

// Chamando a função styled e utilizando . para definir qual tag do html irá receber o estilo
export const StyledButton = styled.button`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 1rem;
    
    border-radius: 1rem;
    background-color: var(--clr-green-500);
    
    /* & para utilizar pseudoclasses no botão */
    &:hover {
        background-color: var(--clr-green-400);
        transform: translateY(-5px);
        transition: all 0.4s;
    }
    
    a{
        width: 100%;
        padding: 1rem;
        color: #121212;
    }

`
