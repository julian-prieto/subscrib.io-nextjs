import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { darkTheme, lightTheme } from "ui";
import { useUserPreferences } from "hooks";
import { Header, SideMenu } from "components";

const GlobalStyle = createGlobalStyle`
  html {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    max-height: 100%;
    width: 100%;


    & > #__next {
      display: flex;
      flex-direction: column;
      height: 100%;
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
  const { theme } = useUserPreferences();
  const selectedTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle />
      <StyledLayout>
        {/* <StyledHeader /> */}
        <StyledMenu />
        <StyledContent layout="position">{children}</StyledContent>
      </StyledLayout>
    </ThemeProvider>
  );
};

/********************* 
  STYLED COMPONENTS 
*********************/

const StyledLayout = styled.div`
  flex: 1;

  max-height: 100vh;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "menu menu"
    "content content";

  @media ${(props) => props.theme.devices.md} {
    grid-template-areas:
      "menu header"
      "menu content";
  }
`;

export const StyledHeader = styled(Header)`
  grid-area: header;
`;
export const StyledMenu = styled(SideMenu)`
  grid-area: menu;
`;
export const StyledContent = styled(motion.div)`
  grid-area: content;

  margin: 0 auto;
  padding: 2rem 1rem;

  width: 100%;

  @media ${(props) => props.theme.devices.sm} {
    padding: 2rem;
  }

  overflow-y: auto;
`;

export default Layout;
