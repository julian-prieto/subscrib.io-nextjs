import styled, { css } from "styled-components";
import { withOpacity, Icon } from "ui";

export const StyledButton = styled.button`
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

  ${(props) =>
    props.xs &&
    css`
      padding: 0 0.75rem;
    `}
`;

export const ButtonContent = styled.div`
  opacity: ${(props) => (props.isLoading ? "0" : "1")}; ;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Svg = styled(Icon)`
  fill: ${(props) => props.theme.colors.button[props.color].color};
`;
