import styled from "styled-components";

const ModalWrapper = styled.main`
  
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
display: flex;
align-items: center;
justify-content: center;
z-index: 10;

  
  .modal {
    background: #fff;
    border-radius: 0.25rem;
    text-align: center;
    place-items: center;
    width: 100%;
    margin: 0;
    box-shadow: none;
    padding: 0;
  }
  
  .modal-nav {
    background: var(--COLOR-GRADIENT);
    border-radius: 0.25rem;
    text-align: center;
    width: 60vw;
    height: 75vh;
    margin: 0;
    box-shadow: none;
    padding: 0;
  }

  .modal-btn {
    cursor: pointer;
    color: #fff;
    font-size: 24px;
    letter-spacing: 1px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: 0.5s ease-in-out all;
    text-transform: capitalize;
    display: inline-block;
  }
  .modal-btn:hover {
    background: var(--COLOR-SELECT);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
`

export default ModalWrapper;