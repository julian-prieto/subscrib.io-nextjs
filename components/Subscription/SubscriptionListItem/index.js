import { useUserPreferences } from "hooks";
import { Tag } from "components";
import { getCreditCardType, getFrequency, getCostByPreference } from "utils";
import {
  Card,
  Title,
  CreditCard,
  CreditCardItem,
  CreditCardType,
  CreditCardNumber,
  Tags,
  Price,
  PriceValue,
  PriceFrequency,
  Actions,
  EditIcon,
  DeleteIcon,
} from "./styled";

const SubscriptionListItem = ({ subscription, onEdit, onRemove, onTagClick }) => {
  const { preferredCurrency } = useUserPreferences();
  const { title, creditCard, frequency, tags, cost } = subscription;

  const costObj = getCostByPreference(cost, preferredCurrency);

  return (
    <Card>
      <Title>{title}</Title>
      <CreditCard>
        {creditCard && (
          <CreditCardItem cardColor={creditCard.color}>
            {creditCard.type && <CreditCardType>{getCreditCardType(creditCard.type)}</CreditCardType>}
            {creditCard.number && (
              <CreditCardNumber cardColor={creditCard.color}>{creditCard.number}</CreditCardNumber>
            )}
          </CreditCardItem>
        )}
      </CreditCard>
      <Tags>
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} onClick={onTagClick} />
        ))}
      </Tags>
      <Price>
        <PriceValue>
          {costObj.value} {costObj.currency}
        </PriceValue>
        <PriceFrequency>/ {getFrequency(frequency)}</PriceFrequency>
      </Price>
      <Actions>
        <EditIcon onClick={onEdit} />
        <DeleteIcon onClick={onRemove} />
      </Actions>
    </Card>
  );
};

export default SubscriptionListItem;
