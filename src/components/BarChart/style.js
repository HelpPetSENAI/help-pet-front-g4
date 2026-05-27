import styled from "styled-components";


export const StyledCanvasWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.2rem;
  padding: 1rem 0;

  width: 100%;

  p {
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.6);
  }

  canvas {
    display: block;
    
    width: 100%;
    height: 100%;
    min-height: 350px;
    max-height: 700px;
  }
`