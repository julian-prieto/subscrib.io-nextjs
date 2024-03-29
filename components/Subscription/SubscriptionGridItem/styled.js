import styled from "styled-components";
import { withOpacity, getContrastColor } from "ui";

export const Card = styled.div`
  position: relative;
  border-radius: 0.75rem;
  background: ${(props) => props.theme.colors.subscription.card.background};
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.1);

  transition: box-shadow 0.2s ease-out;
  &:hover {
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const OptionsWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.75rem 0.5rem;
`;

export const Strip = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 0.5rem 0;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

export const Title = styled.div`
  position: relative;
  transform: translateX(-0.5rem);
  padding: 0.5rem 1rem 0.5rem;

  border-radius: 0.25rem;
  border-top-left-radius: 0;
  background-color: ${(props) => props.theme.colors.subscription.card.title.background};

  color: ${(props) => props.theme.colors.subscription.card.title.color};
  font-size: 1.5rem;
  font-weight: 700;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    border-style: solid;
    border-width: 0.5rem 0.5rem 0px 0px;
    border-color: ${(props) => withOpacity(40, props.theme.colors.subscription.card.title.background)}
      transparent transparent transparent;

    transform: translateY(-100%) rotate(180deg);
  }
`;

export const CreditCard = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: ${(props) =>
    props.cardColor
      ? getContrastColor(props.cardColor)
      : props.theme.colors.subscription.card.creditCard.color};
  background-color: ${(props) =>
    props.cardColor ? props.cardColor : props.theme.colors.subscription.card.creditCard.defaultBackground};
`;

export const CreditCardType = styled.div`
  font-weight: 700;
`;

export const CreditCardNumber = styled.div`
  font-weight: 700;
  padding: 0rem 0.25rem;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    withOpacity(
      10,
      props.cardColor
        ? getContrastColor(props.cardColor)
        : props.theme.colors.subscription.card.creditCard.defaultNumberBackground
    )};
`;

export const Cost = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

export const CostPrice = styled.div`
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 700;
`;

export const CostFrequency = styled.div`
  font-size: 1rem;
  font-weight: 700;
  opacity: 0.7;
`;

export const Tags = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 1rem;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10;

  border-radius: 0.75rem;
  background: ${(props) => props.theme.colors.subscription.card.background};
`;
