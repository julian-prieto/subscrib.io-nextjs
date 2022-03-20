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
  position: relative;
  display: flex;
  flex-direction: ${(props) => props.reverse && "row-reverse"};

  border: none;
  border-radius: 0.25rem;

  font-size: 0.875rem;

  background-color: ${(props) => props.theme.colors.select.background};

  outline: ${(props) => (props.isOpen ? `1px solid ${props.theme.colors.select.outline}` : "none")};
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
  background-color: ${(props) => props.theme.colors.select.labelBackground};
`;

export const Select = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  flex-direction: ${(props) => props.reverse && "row-reverse"};

  flex: 1;
`;

export const SelectItem = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  padding: ${(props) => (props.selected ? "0.5rem 1rem" : "0 0.5rem")};

  cursor: pointer;

  user-select: none;
`;

export const SelectIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  transition: transform 0.2s ease-in;
  transform: rotate(0);
  ${(props) =>
    props.isOpen &&
    css`
      transform: ${(props) => (props.reverse ? "rotate(-180deg)" : "rotate(180deg)")};
    `};
`;

export const SelectMenu = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 0.25rem;
  align-items: ${(props) => props.reverse && "flex-end"};

  position: absolute;
  top: 100%;
  left: 0;

  padding: 0.5rem 0;

  width: 100%;
  max-height: 20rem;
  overflow-y: auto;

  transform: translate(0px, 0.25rem);

  border-radius: 0.25rem;

  outline: ${(props) => (props.isOpen ? `1px solid ${props.theme.colors.select.outline}` : "none")};

  z-index: 30;

  background-color: ${(props) => props.theme.colors.select.background};

  &:hover {
  }
`;

export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 30;
  background-color: transparent;
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;

  color: ${(props) => props.theme.colors.alert};
  font-weight: 500;
`;

export const Placeholder = styled.span`
  opacity: 0.5;
`;
