import { getCreditCardType, getFrequency } from "utils";
import {
  Card,
  Strip,
  Title,
  CreditCard,
  CreditCardType,
  CreditCardNumber,
  Cost,
  CostPrice,
  CostFrequency,
  Tags,
} from "./styled";
import { Tag } from "components";

const SubscriptionCard = ({ title, creditCard, price, currency, frequency, tags }) => {
  return (
    <Card>
      <Strip>
        <Title>{title}</Title>
        <CreditCard cardColor={creditCard.color}>
          <CreditCardType>{getCreditCardType(creditCard.type)}</CreditCardType>
          <CreditCardNumber cardColor={creditCard.color}>{creditCard.number}</CreditCardNumber>
        </CreditCard>
      </Strip>
      <Cost>
        <CostPrice>
          {price} {currency}
        </CostPrice>
        <CostFrequency>/ {getFrequency(frequency)}</CostFrequency>
      </Cost>
      <Tags>
        {tags?.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </Tags>
    </Card>
  );
};

export default SubscriptionCard;
