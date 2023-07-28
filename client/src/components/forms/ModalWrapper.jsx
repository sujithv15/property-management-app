import styled from "styled-components";

const ModalWrapper = styled.main`
  
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
display: grid;
place-items: center;
opacity: 1;
visibility: visible;
z-index: 10;
transition-property: opacity;
transition-duration: 2s;
  
  .modal {
    background: #fff;
    width: 70vw;
    height: 80vh;
    border-radius: 0.25rem;
    max-width: 1120px;
    text-align: center;
    place-items: center;
    overflow: hidden;
  }

  .cancelBtn {
    margin-top: 10px;
    cursor: pointer;
    font-weight: 500;
    padding: 11px 28px;
    border-radius: 12px;
    font-size: 0.8rem;
    border: none;
    color: #2c3e50;
    background: #fcfcfc;
    transition: all 0.25s ease;
  }
`

export default ModalWrapper;