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

export const Wrapper = styled.div`
  display: flex;

  border: none;
  border-radius: 0.25rem;

  background-color: ${(props) => props.theme.colors.input.background};

  & + & {
    margin-top: 1rem;
  }

  &:focus-within {
    outline: 1px solid ${(props) => props.theme.colors.input.outline};
  }
`;

export const StyledLabel = styled.label`
  padding: 0.5rem 1rem;

  ${(props) =>
    props.labelSize &&
    css`
      width: ${LABEL_SIZES[props.labelSize] ? LABEL_SIZES[props.labelSize] : "unset"};
    `}

  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  background-color: ${(props) => props.theme.colors.input.labelBackground};
`;

// export const StyledInput = styled.input`
//   padding: 0.25rem 0.5rem;
//   width: 100%;

//   border-top-right-radius: 0.25rem;
//   border-bottom-right-radius: 0.25rem;

//   background-color: transparent;
//   border: none;

//   color: ${(props) => props.theme.colors.input.color};

//   &:focus {
//     outline: none;
//   }

//   &:-webkit-autofill,
//   &:-webkit-autofill:hover,
//   &:-webkit-autofill:focus,
//   &:-webkit-autofill:active {
//     box-shadow: 0 0 0 30px ${(props) => props.theme.colors.input.background} inset !important;
//     -webkit-box-shadow: 0 0 0 30px ${(props) => props.theme.colors.input.background} inset !important;
//   }
//   &:-webkit-autofill {
//     -webkit-text-fill-color: ${(props) => props.theme.colors.input.color} !important;
//   }
// `;

// export const ErrorMessage = styled.div`
//   color: ${(props) => props.theme.colors.alert};
//   font-weight: 500;
// `;
