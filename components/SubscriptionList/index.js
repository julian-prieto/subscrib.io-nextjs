import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FaPlus } from "react-icons/fa";
import { GET_SUBSCRIPTIONS } from "graphql/queries";
import { useAuth } from "hooks";
import { SubscriptionCard, Modal, AddEditSubscription } from "components";
import { Header, H1, AddIcon, Grid } from "./styled";

const SubscriptionList = () => {
  const { user } = useAuth();

  const [isCreating, setIsCreating] = useState(false);

  const { data: { subscriptions = [] } = {}, loading } = useQuery(GET_SUBSCRIPTIONS, { skip: !user });

  const CREATE_MODAL = {
    title: <span>Create Subscription</span>,
    body: <AddEditSubscription onClose={() => setIsCreating(false)} />,
  };

  return (
    <>
      <Header>
        <H1>Subscriptions</H1>
        <AddIcon onClick={() => setIsCreating(true)}>
          <FaPlus />
        </AddIcon>
      </Header>
      {loading && "Loading Subscriptions..."}
      <Grid>
        {subscriptions.map((subscription) => (
          <SubscriptionCard key={subscription.id} subscription={subscription} />
        ))}
      </Grid>
      <Modal isOpen={isCreating} onClose={() => setIsCreating(false)} content={CREATE_MODAL} />
    </>
  );
};

export default SubscriptionList;
