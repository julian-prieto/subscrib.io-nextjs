import { useMemo } from "react";
import { useUserPreferences, useSubscriptions } from "hooks";
import { getCreditCardsFromSubscriptionList, getCostByFrequency, groupBy, sumBy, round } from "utils";

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

export const useSummary = ({ costFrequency }) => {
  const { data: dataQuery } = useSubscriptions();
  const { preferredCurrency } = useUserPreferences();

  const hasData = !!dataQuery?.subscriptions?.length;

  const ccGroup = hasData && groupBy(dataQuery.subscriptions, SUMMARY_GROUP_BY_OPTIONS.BY_CREDIT_CARD);
  const costByCreditCard = ccGroup && sumBy(ccGroup, costFrequency, preferredCurrency);

  // Data for <Table />
  const table = useMemo(() => {
    if (!hasData || !costByCreditCard) return null;

    return {
      view: SUMMARY_VIEWS.DEFAULT,
      creditCardMap: getCreditCardsFromSubscriptionList(dataQuery.subscriptions),
      data: costByCreditCard,
    };
  }, [dataQuery, hasData, costByCreditCard]);

  // Data for <TotalMonthlyCost />
  const totalMonthlyCost = useMemo(() => {
    if (!hasData || !costByCreditCard) return null;

    const monthlyCost = Object.entries(costByCreditCard).reduce(
      (prev, [_, curr]) => ({
        currency: curr.currency,
        value: round(prev.value + curr.value),
      }),
      { value: 0 }
    );

    return monthlyCost;
  }, [hasData, costByCreditCard]);

  // Data for <Charts />
  const chartData = useMemo(() => {
    if (!dataQuery || !costByCreditCard) return null;

    // BY CREDIT CARD
    const cards = getCreditCardsFromSubscriptionList(dataQuery.subscriptions);
    const labels = Object.entries(cards).map(([_, value]) => `${value.type} [${value.number}]`);
    const colors = Object.entries(cards).map(([_, value]) => value.color);

    const chartByCreditCard = {
      labels: labels,
      datasets: [
        {
          data: Object.entries(costByCreditCard).map(([_, value]) => value),
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    };

    // BY TAG
    const costByTag = dataQuery.subscriptions
      .map((s) =>
        s.tags.map((tag) => ({
          cost: getCostByFrequency(s, preferredCurrency, costFrequency),
          tag: tag.name,
        }))
      )
      .flat()
      .reduce(
        (acc, curr) => ({
          ...acc,
          [curr.tag]: curr.cost + (acc[curr.tag] ? acc[curr.tag] : 0),
        }),
        {}
      );
    const chartByTag = {
      labels: Object.keys(costByTag),
      datasets: [
        {
          data: Object.entries(costByTag).map(([_, value]) => value),
          backgroundColor: [
            "rgba(255, 99, 132)",
            "rgba(54, 162, 235)",
            "rgba(255, 206, 86)",
            "rgba(75, 192, 192)",
            "rgba(153, 102, 255)",
            "rgba(255, 159, 64)",
            "rgba(100, 159, 64)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(100, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return {
      byCreditCard: chartByCreditCard,
      byTag: chartByTag,
    };
  }, [dataQuery, costFrequency, costByCreditCard, preferredCurrency]);

  return {
    table,
    charts: chartData,
    totalMonthlyCost,
  };
};
