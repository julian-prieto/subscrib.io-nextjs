import { useMemo, useState } from "react";
import { useUserPreferences, useSubscriptions } from "hooks";
import {
  EMPTY_FIELD,
  getCreditCardsFromSubscriptionList,
  getCreditCardType,
  groupBy,
  sumBy,
  SUMMARY_VIEWS,
} from "utils";
import { Wrapper, Item, CreditCard, CreditCardType, CreditCardNumber, ItemContent, H1 } from "./styled";
import { Dropdown } from "components";

const SUMMARY_GROUP_BY_OPTIONS = {
  BY_CURRENCY: "currency",
  BY_PREFERENCES_CURRENCY: "currencyDisplay",
  BY_CREDIT_CARD: (s) =>
    s?.creditCard?.id ? `${s.creditCard.number}_${s.creditCard.type}` : "NO_CREDITCARD",
};

const SubscriptionSummary = () => {
  const { preferredCurrency } = useUserPreferences();
  const [groupedBy, setGroupedBy] = useState();
  const [costFrequency, setCostFrequency] = useState("MONTHLY");

  const { data: dataQuery } = useSubscriptions();

  const SUBSCRIPTIONS_DATA = !!dataQuery?.subscriptions?.length;
  const GROUP_BY_DEFINED = groupedBy && groupedBy !== EMPTY_FIELD;
  const PREFERRED_CURRENCY_DEFINED = !!preferredCurrency;

  const summary = useMemo(() => {
    if (!SUBSCRIPTIONS_DATA) return { view: SUMMARY_VIEWS.UNKNOWN, data: null };

    if (!GROUP_BY_DEFINED && PREFERRED_CURRENCY_DEFINED) {
      const groupByCreditCard = groupBy(
        groupBy(dataQuery.subscriptions, SUMMARY_GROUP_BY_OPTIONS.BY_CREDIT_CARD),
        SUMMARY_GROUP_BY_OPTIONS.BY_PREFERENCES_CURRENCY
      );
      const costByGroup = sumBy(groupByCreditCard, costFrequency, "priceDisplay");

      return {
        view: SUMMARY_VIEWS.PREFERENCES_CURRENCY_SELECTED,
        creditCardMap: getCreditCardsFromSubscriptionList(dataQuery.subscriptions),
        data: costByGroup,
        subs: dataQuery.subscriptions.map((s) => ({
          currency: s.currency,
          price: s.price,
          currencyDisplay: s.currencyDisplay,
          priceDisplay: s.priceDisplay,
        })),
      };
    }

    if (!GROUP_BY_DEFINED) {
      const groupByCreditCardAndCurrency = groupBy(
        groupBy(dataQuery.subscriptions, SUMMARY_GROUP_BY_OPTIONS.BY_CREDIT_CARD),
        SUMMARY_GROUP_BY_OPTIONS.BY_CURRENCY
      );
      const costByGroup = sumBy(groupByCreditCardAndCurrency, costFrequency);

      return {
        view: SUMMARY_VIEWS.DEFAULT,
        creditCardMap: getCreditCardsFromSubscriptionList(dataQuery.subscriptions),
        data: costByGroup,
      };
    }

    const groupByCreditCard = groupBy(dataQuery.subscriptions, SUMMARY_GROUP_BY_OPTIONS[groupedBy]);
    const costByGroup = sumBy(groupByCreditCard, costFrequency);

    return { view: SUMMARY_VIEWS.UNKNOWN, data: costByGroup };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataQuery, groupedBy, costFrequency]);

  return (
    summary.view !== SUMMARY_VIEWS.UNKNOWN && (
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
          .map(([key, value]) => {
            const creditCard = summary.creditCardMap[key];

            return (
              <Item key={key}>
                <CreditCard cardColor={creditCard?.color}>
                  <CreditCardType>
                    {creditCard?.type ? getCreditCardType(creditCard.type) : "NO CARD"}
                  </CreditCardType>
                  {creditCard?.number && (
                    <CreditCardNumber cardColor={creditCard.color}>{creditCard.number}</CreditCardNumber>
                  )}
                </CreditCard>
                <ItemContent>
                  {Object.entries(value).map(([currency, cost]) => (
                    <div key={currency}>
                      {currency} {cost}
                    </div>
                  ))}
                </ItemContent>
              </Item>
            );
          })}
      </Wrapper>
    )
  );
};

export default SubscriptionSummary;
