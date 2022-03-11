import { useEffect, useState } from "react";
import styled from "styled-components";
import { Svg } from "ui";

const Wrapper = styled.div`
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.colors.collapse.background};
  color: ${(props) => props.theme.colors.collapse.color};
`;

const Header = styled.div`
  display: flex;
  padding: 0.75rem 1rem;
  cursor: pointer;
`;

const Title = styled.div`
  flex: 1;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${(props) => (props.isOpen ? "rotate(-90deg)" : "rotate(0deg)")};

  transition: transform 0.2s ease-out;
`;

const ContentWrapper = styled.div`
  max-height: ${(props) => (props.isOpen ? "100vh" : "0px")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const Content = styled.div`
  padding: 0.75rem 1rem;
  border-top: 1px solid ${(props) => props.theme.colors.collapse.divider};
`;

const renderDefaultIcon = () => {
  return (
    <Svg
      role="presentation"
      focusable="false"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="M15.5 19l-7-7 7-7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

const Collapsible = ({ title, icon, content, open = false, onToggle }) => {
  const [isOpen, setIsOpen] = useState(open);
  const handleToggleOpen = () => {
    if (onToggle) {
      onToggle();
    } else {
      setIsOpen((p) => !p);
    }
  };
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Wrapper>
      <Header onClick={handleToggleOpen}>
        <Title>{title}</Title>
        <IconWrapper isOpen={isOpen}>{icon || renderDefaultIcon()}</IconWrapper>
      </Header>
      <ContentWrapper isOpen={isOpen}>
        <Content>{content}</Content>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Collapsible;
