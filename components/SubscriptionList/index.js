import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FaPlus } from "react-icons/fa";
import { GET_SUBSCRIPTIONS } from "graphql/queries";
import { useAuth, useUserPreferences } from "hooks";
import { SubscriptionCard, Modal, AddEditSubscription } from "components";
import { Header, H1, AddIcon, Grid } from "./styled";
import { EMPTY_FIELD } from "utils";

const SubscriptionList = () => {
  const { user } = useAuth();
  const { preferredCurrency, setPreferredCurrency } = useUserPreferences();
  const [isCreating, setIsCreating] = useState(false);

  const handleChangeCurrency = (event) => {
    const currency = event.target.value;
    if (currency === EMPTY_FIELD) {
      setPreferredCurrency();
      return;
    }
    setPreferredCurrency(currency);
  };

  const { data: dataQuery, loading: loadingQuery } = useQuery(GET_SUBSCRIPTIONS, {
    variables: { convertToCurrency: preferredCurrency },
    skip: !user,
  });

  const CREATE_MODAL = {
    title: <span>Create Subscription</span>,
    body: <AddEditSubscription onClose={() => setIsCreating(false)} />,
  };

  return (
    <>
      <select value={preferredCurrency || EMPTY_FIELD} onChange={handleChangeCurrency}>
        <option value={EMPTY_FIELD}>{EMPTY_FIELD}</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="ARS">ARS</option>
      </select>
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
