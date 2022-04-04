import styled from "styled-components";
import { Flex, Container } from "ui";
import { SiteMenu } from "components";
import { motion } from "framer-motion";

const StyledHeader = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.header.background};
  color: ${(props) => props.theme.colors.header.color};
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

const Header = (props) => {
  return (
    <StyledHeader {...props} layout>
      <Container>
        <Flex justify="space-between" items="center" p={[0.5, 0]}>
          <Title>Subscrib.io</Title>
          <SiteMenu />
        </Flex>
      </Container>
    </StyledHeader>
  );
};

export default Header;
