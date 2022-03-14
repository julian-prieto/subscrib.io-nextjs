import styled, { css } from "styled-components";
import { getContrastColor } from "ui";

export const Wrapper = styled.div`
  display: flex;

  border: none;
  border-radius: 0.25rem;

  background-color: ${(props) => props.theme.colors.creditCard.background};
  color: ${(props) => props.theme.colors.creditCard.color};
`;

export const CardType = styled.div`
  flex: 1;
  margin: 1rem 0;
  padding: 0.5rem 1rem;

  font-weight: 700;
`;

export const CardNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 1rem 0;
  padding: 0.5rem;

  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;

  font-weight: 700;

  background-color: ${(props) => (props.color ? props.color : props.theme.colors.option)};
  color: ${(props) => (props.color ? getContrastColor(props.color) : props.theme.colors.lighter)};
`;

export const CardActions = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  padding: 0rem 0.5rem;

  font-size: 0.75rem;

  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;

  ${(props) =>
    props.top &&
    css`
      border-bottom-right-radius: 0;
    `}

  ${(props) =>
    props.bottom &&
    css`
      border-top-right-radius: 0;
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

const Input = styled.input`
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  background-color: transparent;
  border: none;
  color: inherit;

  background-color: ${(props) => props.theme.colors.creditCard.editBackground};
  &:focus {
    outline: ${(props) => (props.error ? "1px solid red" : "none")};
  }
`;

export const CardNumberInput = styled(Input)`
  width: 3rem;
`;

export const CardTypeInput = styled(Input)`
  width: 100%;
`;
