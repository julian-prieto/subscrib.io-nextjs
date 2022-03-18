import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SUBSCRIPTIONS } from "graphql/queries";
import { useAuth, useUserPreferences } from "hooks";
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
  Currency: "currency",
  "Credit Card": (s) => (s?.creditCard?.id ? `${s.creditCard.number}_${s.creditCard.type}` : "NO_CREDITCARD"),
};

const SubscriptionSummary = () => {
  const { user } = useAuth();
  const { preferredCurrency } = useUserPreferences();
  const [groupedBy, setGroupedBy] = useState();
  const [costFrequency, setCostFrequency] = useState("MONTHLY");

  const { data: dataQuery } = useQuery(GET_SUBSCRIPTIONS, {
    variables: { convertToCurrency: preferredCurrency },
    skip: !user,
  });

  const NO_SUBSCRIPTIONS_DATA = !dataQuery?.subscriptions?.length;
  const NO_GROUP_BY_DEFINED = !groupedBy || groupedBy === EMPTY_FIELD;
  const NO_PREFERRED_CURRENCY_DEFINED = !groupedBy || groupedBy === EMPTY_FIELD;

  const summary = useMemo(() => {
    if (NO_SUBSCRIPTIONS_DATA) return { view: SUMMARY_VIEWS.UNKNOWN, data: null };

    if (NO_GROUP_BY_DEFINED && NO_PREFERRED_CURRENCY_DEFINED) {
      const groupByCreditCard = groupBy(
        groupBy(dataQuery.subscriptions, SUMMARY_GROUP_BY_OPTIONS["Credit Card"]),
        SUMMARY_GROUP_BY_OPTIONS.Currency
      );
      const costByGroup = sumBy(groupByCreditCard, costFrequency);

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
    summary.view === SUMMARY_VIEWS.DEFAULT && (
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
