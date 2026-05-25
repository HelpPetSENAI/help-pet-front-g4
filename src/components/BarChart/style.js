import styled from "styled-components";

export const StyledCanvasWrapper = styled.div`
  width: 100%;
  
  /* 1. REQUIRED: Chart.js needs this to calculate absolute 
     positioning for the internal canvas element */
  position: relative; 

  /* 2. CRITICAL: You must give the container a specific height. 
     If you want it to be flexible, use a container with a fixed size 
     further up the tree, or set a height here (e.g., 300px, 40vh, etc.) */
  height: 650px; 

  padding-top: 1rem;
  
  /* 3. OPTIONAL: Ensuring the canvas behaves as a block element 
     prevents minor layout shifts */
  canvas {
    display: block;
  }

  p {
    font-size: 1rem;
    color: rgba(0,0,0,0.45);
  }
`;