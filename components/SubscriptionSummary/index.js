import { useQuery } from "@apollo/client";
import { GET_SUBSCRIPTIONS } from "graphql/queries";
import { useAuth, useUserPreferences } from "hooks";
import { useMemo } from "react";
import { round } from "utils";
// import {  } from "./styled";

const SubscriptionSummary = () => {
  const { user } = useAuth();
  const { preferredCurrency } = useUserPreferences();

  const { data: dataQuery, loading: loadingQuery } = useQuery(GET_SUBSCRIPTIONS, {
    variables: { convertToCurrency: preferredCurrency },
    skip: !user,
  });

  const summaryObject = useMemo(() => {
    if (!dataQuery?.subscriptions?.length) return null;

    return dataQuery.subscriptions.reduce((prev, current) => {
      return {
        ...prev,
        [current.currency]: round((prev[current.currency] || 0) + current.price, 2),
      };
    }, {});
  }, [dataQuery]);

  // console.log("summaryObject:", summaryObject);

  return <pre>{JSON.stringify(summaryObject, null, 2)}</pre>;
};

export default SubscriptionSummary;
