import { FaTrash, FaPen } from "react-icons/fa";
import { useUserPreferences } from "hooks";
import { Tag, OptionsMenu } from "components";
import { getCostByPreference, getCreditCardType, getFrequency } from "utils";
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
  const { preferredCurrency } = useUserPreferences();
  const { title, creditCard, frequency, tags, cost } = subscription;

  const costObj = getCostByPreference(cost, preferredCurrency);

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
          {costObj.value} {costObj.currency}
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
