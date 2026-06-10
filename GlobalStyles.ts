import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  body{
    font-family: 'Poppins', sans-serif;
    background:#EEF2F7;
  }

  button{
    cursor:pointer;
  }

  a{
    text-decoration:none;
    color:inherit;
  }
`;