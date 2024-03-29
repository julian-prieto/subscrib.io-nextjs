import styled, { css } from "styled-components";
import Input from "ui/Input";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;

  border-radius: 0.25rem;

  background-color: ${(props) => props.theme.colors.tag.background};
  color: ${(props) => props.theme.colors.tag.color};

  font-size: ${(props) => (props.managing ? "1rem" : "0.75rem")};

  ${(props) =>
    props.hasClickAction &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}
`;

export const TagName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.25rem 0.5rem;
`;

export const TagIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0rem 0.5rem;

  ${(props) =>
    !props.hasSibling &&
    css`
      border-radius: 0.25rem;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `}

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors[props.color]};
  }

  ${(props) =>
    props.isLoading &&
    css`
      @-webkit-keyframes icon-spin {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(359deg);
          transform: rotate(359deg);
        }
      }

      @keyframes icon-spin {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(359deg);
          transform: rotate(359deg);
        }
      }
      & > * {
        -webkit-animation: icon-spin 2s infinite linear;
        animation: icon-spin 2s infinite linear;
      }
    `}
`;

export const TagInput = styled(Input)`
  padding: 0 0.25rem;
  margin: 0 0.25rem;

  &:focus {
    outline: ${(props) => (props.error ? "1px solid red" : "none")};
  }
`;
