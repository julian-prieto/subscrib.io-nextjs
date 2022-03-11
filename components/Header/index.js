import { useTheme, useAuth } from "hooks";
import styled from "styled-components";
import { Button, Flex, Container } from "ui";

const StyledHeader = styled.div`
  margin-bottom: 2rem;
  background-color: ${(props) => props.theme.colors.header.background};
  color: ${(props) => props.theme.colors.header.color};
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { LoginButton, LogoutButton, user } = useAuth();

  return (
    <StyledHeader>
      <Container>
        <Flex justify="space-between" items="center" p={[0.5, 0]}>
          <Title>Subscrib.io</Title>
          {!user && <LoginButton />}
          {user && <LogoutButton />}
          <Button color="secondary" onClick={() => toggleTheme()}>
            {theme === "light" ? "🌙" : "🌞"}
          </Button>
        </Flex>
      </Container>
    </StyledHeader>
  );
};

export default Header;
