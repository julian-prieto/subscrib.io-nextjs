import styled from "styled-components";
import { Card, getContrastColor, withOpacity } from "ui";
import { getCreditCardType, getFrequency } from "utils";
import { useSummary } from "../hooks";

const SubscriptionSummaryTable = (props) => {
  const { table } = useSummary({ costFrequency: "MONTHLY" });

  if (!table) {
    return null;
  }

  return (
    <Wrapper {...props}>
      {Object.entries(table.data)
        .sort((a) => (a[0] === "NO_CREDITCARD" ? 1 : -1))
        .map(([cc, cost]) => {
          const creditCard = table.creditCardMap[cc];

          return (
            <Item key={cc}>
              <CreditCard cardColor={creditCard?.color}>
                <CreditCardType>
                  {creditCard?.type ? getCreditCardType(creditCard.type) : "NO CARD"}
                </CreditCardType>
                {creditCard?.number && (
                  <CreditCardNumber cardColor={creditCard.color}>{creditCard.number}</CreditCardNumber>
                )}
              </CreditCard>
              <ItemContent>
                <ItemCost>
                  {cost.value} {cost.currency}
                </ItemCost>
                <ItemFrequency>/ {getFrequency("MONTHLY")}</ItemFrequency>
              </ItemContent>
            </Item>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CreditCard = styled.div`
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

const CreditCardType = styled.div`
  font-weight: 700;
`;

const CreditCardNumber = styled.div`
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

const ItemContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
  /* flex-direction: column; */
  flex: 1;
  padding: 0.25rem 0.5rem;

  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.colors.summary.item.background};
`;

const ItemCost = styled.span`
  font-weight: 700;
  font-size: 1rem;
`;

const ItemFrequency = styled.span`
  font-weight: 500;
  font-size: 0.875rem;
  opacity: 0.7;
`;
export default SubscriptionSummaryTable;
