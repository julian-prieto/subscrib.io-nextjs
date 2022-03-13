import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.colors.collapse.background};
  color: ${(props) => props.theme.colors.collapse.color};
`;

export const Header = styled.div`
  display: flex;
  padding: 0.75rem 1rem;
  cursor: pointer;
`;

export const Title = styled.div`
  flex: 1;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${(props) => (props.isOpen ? "rotate(-90deg)" : "rotate(0deg)")};

  transition: transform 0.2s ease-out;
`;

export const ContentWrapper = styled.div`
  max-height: ${(props) => (props.isOpen ? "100vh" : "0px")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

export const Content = styled.div`
  padding: 0.75rem 1rem;
  border-top: 1px solid ${(props) => props.theme.colors.collapse.divider};
`;
