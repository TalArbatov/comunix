import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Frutiger, "Frutiger Linotype", Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;
    .application {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
  
`;

export const StyledSearch = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  button {
    width:20%;
  }
  input {
    width: 80%;
    height: 45px;
    border-radius: 5px;
    outline: none;
    border: 1px solid lightgrey;
    font-size: 25px;
    padding: 20px;
    box-sizing: border-box;
  }
`;

export const StyledContent = styled.div`
  width: 50%;
  min-height: 100vh;
  background: #efefefef;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 30px 20px;
  box-sizing: border-box;
  @media screen and (max-width: 992px) {
    width: 75%;
  }
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

export const StyledResults = styled.div`
  width: 100%;
  .show-more-container {
    display: flex;
    justify-content: center;
  }
  .options-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const StyledResult = styled.div`
  width: 100%;
  margin: 15px 0;
  padding: 15px;
  box-sizing: border-box;
  background-color: lightgrey;
  p {
    margin: 5px;
  }
  .result-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .result-image {
    margin-right: 15px;
    img {
      height: 100px;
      width: 100px;
      background-size: cover;
      border-radius: 10px;
    }
  }
  .result-image-small {
    img {
      height: 50px;
      width: 50px;
      background-size: cover;
      border-radius: 10px;
      margin-right: 20px;
    }
  }
`;