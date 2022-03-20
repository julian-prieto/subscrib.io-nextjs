import styled, { css } from "styled-components";

const LABEL_SIZES = {
  xs: "2rem",
  md: "4rem",
  lg: "6rem",
  xl: "7rem",
  "2xl": "8rem",
  "3xl": "9rem",
  "4xl": "10rem",
  auto: "unset",
};

export const Field = styled.div`
  display: flex;
  flex: 1;

  border: none;
  border-radius: 0.25rem;

  background-color: ${(props) => props.theme.colors.input.background};

  &:focus-within {
    outline: 1px solid ${(props) => props.theme.colors.input.outline};
  }
`;

export const StyledLabel = styled.label`
  padding: 0.5rem 1rem;

  font-size: 0.875rem;

  ${(props) =>
    props.labelSize &&
    css`
      width: ${LABEL_SIZES[props.labelSize] ? LABEL_SIZES[props.labelSize] : "unset"};
    `}

  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  background-color: ${(props) => props.theme.colors.input.labelBackground};
`;

export const StyledInput = styled.input`
  flex: 1;
  width: 100%;

  padding: 0.25rem 0.5rem;

  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;

  background-color: transparent;
  border: none;

  color: ${(props) => props.theme.colors.input.color};

  &:focus {
    outline: none;
  }

  font-size: 1rem;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: 0 0 0 30px ${(props) => props.theme.colors.input.background} inset !important;
    -webkit-box-shadow: 0 0 0 30px ${(props) => props.theme.colors.input.background} inset !important;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: ${(props) => props.theme.colors.input.color} !important;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;

  padding: 0rem 1rem;

  color: ${(props) => props.theme.colors.alert};
  font-weight: 500;
`;
