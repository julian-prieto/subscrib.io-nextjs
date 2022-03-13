import { useEffect, useState } from "react";
import { Wrapper, Header, Title, IconWrapper, ContentWrapper, Content } from "./styled";
import { Svg } from "ui";

const renderDefaultIcon = () => {
  return (
    <Svg role="presentation" focusable="false" width="18" height="18" fill="none" viewBox="0 0 24 24">
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
