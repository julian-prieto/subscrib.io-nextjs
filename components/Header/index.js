import { useTheme, useAuth } from "hooks";
import Link from "next/link";
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
  const { user } = useAuth();

  return (
    <>
      <StyledHeader>
        <Container>
          <Flex justify="space-between" items="center" p={[0.5, 0]}>
            <Title>Subscrib.io</Title>
            <Button color="secondary" onClick={() => toggleTheme()}>
              {theme === "light" ? "🌙" : "🌞"}
            </Button>
          </Flex>
        </Container>
      </StyledHeader>
      {user && (
        <Flex justify="center" items="center" gap="1rem" m={[0, 0, 2, 0]}>
          <Link href="/">Home</Link> - <Link href="/credit-cards">Credit Cards</Link> -{" "}
          <Link href="/tags">Tags</Link>
        </Flex>
      )}
    </>
  );
};

export default Header;
