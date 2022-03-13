import styled from "styled-components";
import { withOpacity } from "ui";

export const Card = styled.div`
  border-radius: 0.75rem;
  background: ${(props) => props.theme.colors.subscriptionCard.background};
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.1);

  transition: transform 0.2s ease-out;
  &:hover {
    transform: scale(1.01);
  }
`;

export const Strip = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.subscriptionCard.strip.color};
`;

export const Title = styled.div`
  font-weight: 700;
`;

export const CreditCard = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: ${(props) => (props.cardColor ? props.cardColor : props.theme.colors.subscriptionCard.creditCard.color)};
  background-color: ${(props) =>
    props.cardColor ? props.cardColor : props.theme.colors.subscriptionCard.creditCard.defaultBackground};
`;

export const CreditCardType = styled.div`
  font-weight: 700;
`;

export const CreditCardNumber = styled.div`
  padding: 0rem 0.25rem;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    withOpacity(10, props.theme.colors.subscriptionCard.creditCard.defaultNumberBackground)};
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
  gap: 0.25rem;
  padding: 1rem;
`;
