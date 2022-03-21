import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FaPlus } from "react-icons/fa";
import { BsGrid3X3GapFill, BsListUl } from "react-icons/bs";
import { GET_SUBSCRIPTIONS } from "graphql/queries";
import { useAuth, useUserPreferences } from "hooks";
import { Subscription, Modal, AddEditSubscription, Dropdown } from "components";
import { Header, H1, H2, AddIcon, Subscriptions } from "./styled";
import { EMPTY_FIELD } from "utils";
import { Button } from "ui";

const SubscriptionList = () => {
  const { user } = useAuth();
  const { preferredCurrency, setPreferredCurrency } = useUserPreferences();
  const [isCreating, setIsCreating] = useState(false);
  const [layout, setLayout] = useState("GRID");

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
    title: <H2>Create Subscription</H2>,
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
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <Button onClick={() => setLayout("GRID")} disabled={layout === "GRID"}>
                <BsGrid3X3GapFill />
              </Button>
              <Button onClick={() => setLayout("LIST")} disabled={layout === "LIST"}>
                <BsListUl />
              </Button>
            </div>
            <Dropdown
              labelSize="4xl"
              label="Display currency"
              options={["USD", "EUR", "ARS"]}
              value={preferredCurrency}
              onChange={handleChangeCurrency}
              renderOption={(option) => option}
              placeholder="default"
              allowEmptyValue
            />
          </div>
          <Subscriptions layout={layout}>
            {dataQuery?.subscriptions?.map((subscription) => (
              <Subscription key={subscription.id} subscription={subscription} layout={layout} />
            ))}
          </Subscriptions>
        </>
      ) : (
        <div>
          No subscriptions in your account yet. Start creating some using the + icon on the top right side!
        </div>
      )}
      <Modal
        maxWidth="32rem"
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        content={CREATE_MODAL}
      />
    </>
  );
};

export default SubscriptionList;
