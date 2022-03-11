import styled, { css } from "styled-components";
import { withOpacity } from "utils";
import { Icon } from "ui";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  border: none;
  padding: 0.5rem 1rem;

  border-radius: 0.25rem;

  cursor: pointer;

  background-color: ${(props) => props.theme.colors.button[props.color].background};
  color: ${(props) => props.theme.colors.button[props.color].color};

  transition: all 0.3s ease-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.button[props.color].backgroundHover};
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.button[props.color].backgroundDisabled};
  }

  ${(props) =>
    props.variant === "outlined" &&
    css`
      border: 1px solid ${props.theme.colors.button[props.color].background};
      color: ${props.theme.colors.button[props.color].background};
      background-color: transparent;

      &:hover {
        background-color: ${(props) =>
          withOpacity(20, props.theme.colors.button[props.color].backgroundHover)};
      }

      &:disabled {
        background-color: transparent;
        border: 1px solid ${props.theme.colors.button[props.color].backgroundDisabled};
        color: ${props.theme.colors.button[props.color].backgroundDisabled};
      }
    `}
`;

const ButtonContent = styled.div`
  opacity: ${(props) => (props.loading ? "0" : "1")}; ;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Svg = styled(Icon)`
  fill: ${(props) => props.theme.colors.button[props.color].color};
`;

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
const Button = ({
  children,
  color = "primary",
  variant = "contained",
  loading = false,
  ...props
}) => {
  return (
    <StyledButton color={color} variant={variant} {...props}>
      <ButtonContent loading={loading ? loading : undefined}>{children}</ButtonContent>
      {loading && <IconWrapper>{renderLoadingIcon(color)}</IconWrapper>}
    </StyledButton>
  );
};

export default Button;
