import { useMemo, useState } from "react";
import { useUserPreferences, useSubscriptions } from "hooks";
import { getCreditCardsFromSubscriptionList, getCreditCardType, groupBy, sumBy } from "utils";
import { Wrapper, Item, CreditCard, CreditCardType, CreditCardNumber, ItemContent, H1 } from "./styled";
import { Dropdown } from "components";

const SUMMARY_VIEWS = {
  DEFAULT: "DEFAULT",
  PREFERENCES_CURRENCY_SELECTED: "PREFERENCES_CURRENCY_SELECTED",
  UNKNOWN: "UNKNOWN",
};

const SUMMARY_GROUP_BY_OPTIONS = {
  BY_CURRENCY: "currency",
  BY_PREFERENCES_CURRENCY: "currencyDisplay",
  BY_CREDIT_CARD: (s) =>
    s?.creditCard?.id ? `${s.creditCard.number}_${s.creditCard.type}` : "NO_CREDITCARD",
};

const SubscriptionSummary = () => {
  const { data: dataQuery } = useSubscriptions();
  const { preferredCurrency } = useUserPreferences();
  const [costFrequency, setCostFrequency] = useState("MONTHLY");

  const SUBSCRIPTIONS_DATA = !!dataQuery?.subscriptions?.length;

  const summary = useMemo(() => {
    if (!SUBSCRIPTIONS_DATA) return null;

    const groupByCreditCard = groupBy(dataQuery.subscriptions, SUMMARY_GROUP_BY_OPTIONS.BY_CREDIT_CARD);
    const costBByCreditCard = sumBy(groupByCreditCard, costFrequency, preferredCurrency);

    return {
      view: SUMMARY_VIEWS.DEFAULT,
      creditCardMap: getCreditCardsFromSubscriptionList(dataQuery.subscriptions),
      data: costBByCreditCard,
    };
  }, [dataQuery, SUBSCRIPTIONS_DATA, preferredCurrency, costFrequency]);

  console.log("summary:", summary);

  if (!summary) {
    return null;
  }

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <H1>Summary</H1>
        <Dropdown
          labelSize="4xl"
          options={["DAILY", "MONTHLY", "YEARLY"]}
          value={costFrequency}
          onChange={(v) => setCostFrequency(v)}
          renderOption={(option) => option}
        />
      </div>
      {Object.entries(summary.data)
        .sort((a) => (a[0] === "NO_CREDITCARD" ? 1 : -1))
        .map(([cc, cost]) => {
          const creditCard = summary.creditCardMap[cc];

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
                {cost.value} {cost.currency}
              </ItemContent>
            </Item>
          );
        })}
    </Wrapper>
  );
};

export default SubscriptionSummary;
