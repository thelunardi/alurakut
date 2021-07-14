import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AluraCommons'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: sans-serif;
    background-color: #D9E6F6;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  //#__next {
  //  display: flex;
  //  min-height: 100vh;
  //  flex-direction: column;
  //  position: relative;
  //  z-index: 1;
  //  overflow: hidden;
  //}
  //
  //#__next:before {
  //  z-index: -1;
  //  position: absolute;
  //  left: 0;
  //  top: 0;
  //  content: url('/static/thumb-1920-34612.jpg');
  //  background-size: cover;
  //  opacity: 0.3;
  //}

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
    colors: {
        primary: '#0070f3',
    },
}

const App = ({Component, pageProps}) => {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}

export default App
