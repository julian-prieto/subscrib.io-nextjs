import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsGrid3X3GapFill, BsListUl } from "react-icons/bs";
import { useUserPreferences, useSubscriptions } from "hooks";
import { Subscription, Modal, AddEditSubscription, Dropdown, FilterTags } from "components";
import { Wrapper, Header, H1, H2, AddIcon, Subscriptions } from "./styled";
import { EMPTY_FIELD } from "utils";
import { Button } from "ui";

const SubscriptionList = () => {
  const { preferredCurrency, setPreferredCurrency } = useUserPreferences();
  const [isCreating, setIsCreating] = useState(false);
  const [layout, setLayout] = useState("GRID");

  const { data: dataQuery, loading: loadingQuery } = useSubscriptions();

  const handleChangeCurrency = (value) => {
    if (value === EMPTY_FIELD) {
      setPreferredCurrency(null);
      return;
    }
    setPreferredCurrency(value);
  };

  const CREATE_MODAL = {
    title: <H2>Create Subscription</H2>,
    body: <AddEditSubscription onClose={() => setIsCreating(false)} />,
  };

  return (
    <Wrapper>
      <Header>
        <H1>Subscriptions</H1>
        <AddIcon onClick={() => setIsCreating(true)}>
          <FaPlus />
        </AddIcon>
      </Header>
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
          options={["USD", "EUR", "GBP", "ARS"]}
          value={preferredCurrency}
          onChange={handleChangeCurrency}
          renderOption={(option) => option}
        />
      </div>
      <FilterTags />
      {loadingQuery ? (
        "Loading Subscriptions..."
      ) : !!dataQuery?.subscriptions?.length ? (
        <Subscriptions layout={layout}>
          {dataQuery?.subscriptions?.map((subscription) => (
            <Subscription key={subscription.id} subscription={subscription} layout={layout} />
          ))}
        </Subscriptions>
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
    </Wrapper>
  );
};

export default SubscriptionList;
