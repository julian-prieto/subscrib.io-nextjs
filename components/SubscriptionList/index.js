import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FaPlus } from "react-icons/fa";
import { GET_SUBSCRIPTIONS } from "graphql/queries";
import { useAuth } from "hooks";
import { SubscriptionCard, Modal, AddEditSubscription } from "components";
import { Header, H1, AddIcon, Grid } from "./styled";

const SubscriptionList = ({ convertToCurrency }) => {
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);

  const { data: dataQuery, loading: loadingQuery } = useQuery(GET_SUBSCRIPTIONS, {
    variables: { convertToCurrency },
    skip: !user,
  });

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
      {loadingQuery && "Loading Subscriptions..."}
      {!!dataQuery?.subscriptions?.length ? (
        <Grid>
          {dataQuery?.subscriptions?.map((subscription) => (
            <SubscriptionCard key={subscription.id} subscription={subscription} />
          ))}
        </Grid>
      ) : (
        !loadingQuery && (
          <div>
            No subscriptions in your account yet. Start creating some using the + icon on the top right side!
          </div>
        )
      )}
      <Modal isOpen={isCreating} onClose={() => setIsCreating(false)} content={CREATE_MODAL} />
    </>
  );
};

export default SubscriptionList;
