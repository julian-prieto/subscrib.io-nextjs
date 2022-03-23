import { FaTrash, FaPen } from "react-icons/fa";
import { Tag, OptionsMenu } from "components";
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
  LoadingOverlay,
} from "./styled";

const SubscriptionCard = ({ subscription, loadingDeleteMutation, onEdit, onRemove, onTagClick }) => {
  const { title, creditCard, price, priceDisplay, currency, currencyDisplay, frequency, tags } = subscription;
  const MENU_ITEMS = [
    { label: "Edit", icon: <FaPen />, action: onEdit },
    { label: "Remove", icon: <FaTrash />, action: onRemove },
  ];

  return (
    <Card>
      {loadingDeleteMutation && <LoadingOverlay>Deleting...</LoadingOverlay>}
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
          {priceDisplay || price} {currencyDisplay || currency}
        </CostPrice>
        <CostFrequency>/ {getFrequency(frequency)}</CostFrequency>
      </Cost>
      <Tags>
        {tags?.map((tag) => (
          <Tag key={tag.id} tag={tag} onClick={onTagClick} />
        ))}
      </Tags>
    </Card>
  );
};

export default SubscriptionCard;
