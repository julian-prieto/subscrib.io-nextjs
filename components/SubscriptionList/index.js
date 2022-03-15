import { useQuery } from "@apollo/client";
import { GET_SUBSCRIPTIONS } from "graphql/queries";
import { useAuth } from "hooks";
import { SubscriptionCard } from "components";
import { Grid } from "./styled";

const SubscriptionList = () => {
  const { user } = useAuth();

  const { data: { subscriptions = [] } = {}, loading } = useQuery(GET_SUBSCRIPTIONS, { skip: !user });

  return (
    <>
      <h1>Subscriptions</h1>
      {loading && "Loading Subscriptions..."}
      <Grid>
        {subscriptions.map((subscription) => (
          <SubscriptionCard key={subscription.id} subscription={subscription} />
        ))}
      </Grid>
    </>
  );
};

export default SubscriptionList;
