import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FaPlus } from "react-icons/fa";
import { GET_SUBSCRIPTIONS } from "graphql/queries";
import { useAuth, useUserPreferences } from "hooks";
import { SubscriptionCard, Modal, AddEditSubscription, Dropdown } from "components";
import { Header, H1, AddIcon, Grid } from "./styled";
import { EMPTY_FIELD } from "utils";

const SubscriptionList = () => {
  const { user } = useAuth();
  const { preferredCurrency, setPreferredCurrency } = useUserPreferences();
  const [isCreating, setIsCreating] = useState(false);

  const handleChangeCurrency = (value) => {
    if (value === EMPTY_FIELD) {
      setPreferredCurrency(null);
      return;
    }
    setPreferredCurrency(value);
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
      <Header>
        <H1>Subscriptions</H1>
        <AddIcon onClick={() => setIsCreating(true)}>
          <FaPlus />
        </AddIcon>
      </Header>
      {loadingQuery ? (
        "Loading Subscriptions..."
      ) : !!dataQuery?.subscriptions?.length ? (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
            <Dropdown
              labelSize="4xl"
              label="Display currency"
              options={["USD", "EUR", "ARS"]}
              value={preferredCurrency}
              onChange={handleChangeCurrency}
              renderOption={(option) => option}
              allowEmptyValue
            />
          </div>
          <Grid>
            {dataQuery?.subscriptions?.map((subscription) => (
              <SubscriptionCard key={subscription.id} subscription={subscription} />
            ))}
          </Grid>
        </>
      ) : (
        <div>
          No subscriptions in your account yet. Start creating some using the + icon on the top right side!
        </div>
      )}
      <Modal isOpen={isCreating} onClose={() => setIsCreating(false)} content={CREATE_MODAL} />
    </>
  );
};

export default SubscriptionList;
