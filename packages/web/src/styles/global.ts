import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    font: 1em 'Poppins', sans-serif;
    background: #f1f1f1;
    color: #2D2D2D;
    font-size: 16px;
    line-height: 1.5em;
    letter-spacing: 0px;
    -webkit-font-smoothing: antialiased !important;
  }
  ul {
    list-style: none;
  }
  a{
    text-decoration: none;
    color: rgb(35, 35, 35);
  }
`
