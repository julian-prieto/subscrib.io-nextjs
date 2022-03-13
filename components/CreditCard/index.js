import { Wrapper, CardType, CardNumber } from "./styled";

const CreditCard = ({ creditCard }) => {
  return (
    <Wrapper>
      <CardNumber color={creditCard.color}>{creditCard.number}</CardNumber>
      <CardType>{creditCard.type}</CardType>
    </Wrapper>
  );
};

export default CreditCard;
