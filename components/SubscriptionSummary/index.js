import { useQuery } from "@apollo/client";
import { GET_SUBSCRIPTIONS } from "graphql/queries";
import { useAuth } from "hooks";
import { useCallback, useMemo } from "react";
import { round } from "utils";
// import {  } from "./styled";

const SubscriptionSummary = ({ convertToCurrency }) => {
  const { user } = useAuth();
  const { data: dataQuery, loading: loadingQuery } = useQuery(GET_SUBSCRIPTIONS, {
    variables: { convertToCurrency },
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
