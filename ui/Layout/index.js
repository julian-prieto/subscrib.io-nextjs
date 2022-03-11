import { ThemeProvider, createGlobalStyle } from "styled-components";
import { darkTheme, lightTheme, Container } from "ui";
import { useTheme } from "hooks";
import { Header } from "components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;

    & > #__next {
      min-height: 100vh;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
  }

  body {
    background-color: ${(props) => props.theme.colors.body.background};
    color: ${(props) => props.theme.colors.body.color};
  }
`;

const Layout = ({ children }) => {
  const { theme } = useTheme();
  const selectedTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle />
      <Header />
      <Container>{children}</Container>
    </ThemeProvider>
  );
};

export default Layout;
