import styled from "styled-components";
import { Flex, Container } from "ui";
import { SiteMenu } from "components";

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
  return (
    <>
      <StyledHeader>
        <Container>
          <Flex justify="space-between" items="center" p={[0.5, 0]}>
            <Title>Subscrib.io</Title>
            <SiteMenu />
          </Flex>
        </Container>
      </StyledHeader>
    </>
  );
};

export default Header;
