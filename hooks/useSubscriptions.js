import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_SUBSCRIPTIONS } from "graphql/queries";
import { useAuth, useUserPreferences } from "hooks";

const useSubscriptions = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { preferredCurrency } = useUserPreferences();

  const { tags } = router.query;

  const { data, loading, error, variables } = useQuery(GET_SUBSCRIPTIONS, {
    variables: {
      convertToCurrency: preferredCurrency,
      tags: tags && tags.split(","),
    },
    skip: !user,
  });

  return { data, loading, error, variables };
};

export default useSubscriptions;
