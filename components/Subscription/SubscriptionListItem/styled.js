import styled from "styled-components";
import { FaTrash, FaPen } from "react-icons/fa";
import { withOpacity, getContrastColor } from "ui";

export const Card = styled.div`
  display: grid;
  align-items: center;

  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    "title title title price price price"
    "creditcard creditcard creditcard creditcard creditcard creditcard"
    "tags tags tags tags tags actions";

  gap: 1rem;

  @media ${(props) => props.theme.devices.md} {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto;
    grid-template-areas: "title title title creditcard creditcard tags tags tags price price price actions";

    gap: 0;
  }

  padding: 1rem 0.5rem;

  &:hover {
    background-color: #fff1;
  }

  box-shadow: 0px -1px 0px 0px #fff1 inset;

  &:last-of-type {
    box-shadow: none;
  }
`;

export const Title = styled.div`
  grid-area: title;

  font-size: 1.25rem;
  line-height: 1.25rem;
  font-weight: 700;
`;

export const CreditCard = styled.div`
  grid-area: creditcard;
  justify-self: start;
  background-color: green;

  @media ${(props) => props.theme.devices.md} {
    justify-self: center;
  }
`;

export const CreditCardItem = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.175rem 0.25rem;
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

export const Tags = styled.div`
  grid-area: tags;

  display: flex;
  gap: 0.25rem;
  @media ${(props) => props.theme.devices.md} {
  }
  align-self: center;
`;

export const Price = styled.div`
  grid-area: price;
  justify-self: end;
  align-self: start;

  @media ${(props) => props.theme.devices.md} {
    align-self: center;
  }

  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
`;

export const PriceValue = styled.div`
  font-size: 1.25rem;
  line-height: 1.25rem;
  font-weight: 700;
`;

export const PriceFrequency = styled.div`
  font-size: 0.75rem;
  line-height: 0.75rem;
  font-weight: 700;
  opacity: 0.7;
`;

export const Actions = styled.div`
  grid-area: actions;

  display: flex;
  gap: 1rem;
  @media ${(props) => props.theme.devices.md} {
    justify-self: end;
  }
`;

export const EditIcon = styled(FaPen)`
  cursor: pointer;
`;

export const DeleteIcon = styled(FaTrash)`
  cursor: pointer;
`;
