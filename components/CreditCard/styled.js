import styled from "styled-components";
import { getContrastColor } from "ui";

export const Wrapper = styled.div`
  display: flex;

  border: none;
  border-radius: 0.25rem;

  background-color: ${(props) => props.theme.colors.creditCard.background};
  color: ${(props) => props.theme.colors.creditCard.color};
`;

export const CardType = styled.div`
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
