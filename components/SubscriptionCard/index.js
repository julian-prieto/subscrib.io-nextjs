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
  OptionsWrapper,
} from "./styled";
import { Tag, OptionsMenu } from "components";
import { FaTrash, FaPen } from "react-icons/fa";

const SubscriptionCard = ({ subscription: { id, title, creditCard, price, currency, frequency, tags } }) => {
  const MENU_ITEMS = [
    { label: "Edit", icon: <FaPen />, action: () => console.log("Edit:", id + "-" + title) },
    { label: "Remove", icon: <FaTrash />, action: () => console.log("Remove:", id + "-" + title) },
  ];

  return (
    <Card>
      <OptionsWrapper>
        <OptionsMenu menuItems={MENU_ITEMS} />
      </OptionsWrapper>
      <Strip>
        <Title>{title}</Title>
        {creditCard && (
          <CreditCard cardColor={creditCard.color}>
            {creditCard.type && <CreditCardType>{getCreditCardType(creditCard.type)}</CreditCardType>}
            {creditCard.number && (
              <CreditCardNumber cardColor={creditCard.color}>{creditCard.number}</CreditCardNumber>
            )}
          </CreditCard>
        )}
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
