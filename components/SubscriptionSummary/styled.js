import styled from "styled-components";
import { getContrastColor, withOpacity } from "ui";

export const Wrapper = styled.div`
  /* position: fixed;
  bottom: 0;
  left: 0; */

  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  z-index: 40;

  margin-top: 4rem;
  padding: 1rem;
  padding-bottom: 4rem;

  border-radius: 0.25rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${(props) => props.theme.colors.card.background};
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.1);
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const CreditCard = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;

  padding: 0.25rem 0.5rem;

  width: 7.5rem;

  border-radius: 0.25rem;
  color: ${(props) =>
    props.cardColor ? getContrastColor(props.cardColor) : props.theme.colors.summary.creditCard.color};
  background-color: ${(props) =>
    props.cardColor ? props.cardColor : props.theme.colors.summary.creditCard.defaultBackground};
`;

export const CreditCardType = styled.div`
  font-weight: 700;
`;

export const CreditCardNumber = styled.div`
  padding: 0rem 0.25rem;

  font-weight: 700;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    withOpacity(
      10,
      props.cardColor
        ? getContrastColor(props.cardColor)
        : props.theme.colors.summary.creditCard.defaultNumberBackground
    )};
`;

export const ItemContent = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  flex: 1;
  padding: 0.25rem 0.5rem;

  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.colors.summary.item.background};
`;
