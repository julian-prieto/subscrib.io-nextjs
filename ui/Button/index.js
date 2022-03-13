import { StyledButton, ButtonContent, IconWrapper, Svg } from "./styled";

const renderLoadingIcon = (color) => {
  return (
    <Svg
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
      width="16px"
      height="16px"
      fill="red"
      color={color}
    >
      <rect x="0" y="0" width="20" height="50">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 50; 0 0"
          begin="0"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="40" y="0" width="20" height="50">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 50; 0 0"
          begin="0.2s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="80" y="0" width="20" height="50">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 50; 0 0"
          begin="0.4s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </Svg>
  );
};
const Button = ({ children, color = "primary", variant = "contained", isLoading = false, ...props }) => {
  return (
    <StyledButton color={color} variant={variant} {...props}>
      <ButtonContent isLoading={isLoading}>{children}</ButtonContent>
      {isLoading && <IconWrapper>{renderLoadingIcon(color)}</IconWrapper>}
    </StyledButton>
  );
};

export default Button;
