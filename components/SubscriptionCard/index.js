import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_SUBSCRIPTION_BY_ID } from "graphql/mutations";
import { GET_SUBSCRIPTIONS } from "graphql/queries";
import { FaTrash, FaPen } from "react-icons/fa";
import { Tag, OptionsMenu, Modal, AddEditSubscription } from "components";
import { getCreditCardType, getFrequency } from "utils";
import {
  Card,
  Strip,
  Title,
  CreditCard,
  CreditCardType,
  CreditCardNumber,
  Cost,
  CostPrice,
  CostFrequency,
  Tags,
  OptionsWrapper,
  LoadingOverlay,
} from "./styled";

const SubscriptionCard = ({ subscription }) => {
  const { id, title, creditCard, price, priceDisplay, currency, currencyDisplay, frequency, tags } =
    subscription;

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [deleteSubscription, { loading: loadingDeleteMutation }] = useMutation(DELETE_SUBSCRIPTION_BY_ID);

  const handleDestroySubscription = () => {
    deleteSubscription({
      variables: { id },
      update: (
        cache,
        {
          data: {
            deleteSubscriptionById: { id },
          },
        }
      ) => {
        try {
          const normalizedCache = cache.extract();
          const cacheIdsToRemove = Object.keys(normalizedCache).filter((key) => key.indexOf(id) !== -1);
          cacheIdsToRemove.forEach((id) => cache.evict({ id }));
          cache.gc();
        } catch (error) {
          console.log("Error mutating GQL Cache:", error);
        }
      },
    });
    setIsDeleting(false);
  };

  const MENU_ITEMS = [
    { label: "Edit", icon: <FaPen />, action: () => setIsEditing(true) },
    { label: "Remove", icon: <FaTrash />, action: () => setIsDeleting(true) },
  ];

  const EDIT_MODAL = {
    title: (
      <span>
        Edit <i>{title}</i>
      </span>
    ),
    body: <AddEditSubscription subscription={subscription} onClose={() => setIsEditing(false)} />,
  };

  const REMOVE_MODAL = {
    title: `Remove: ${subscription.title}`,
    message: "Are you sure you want to remove this subscription?",
    confirm: "REMOVE",
    cancel: "CANCEL",
  };

  return (
    <>
      <Card>
        {loadingDeleteMutation && <LoadingOverlay>Deleting...</LoadingOverlay>}
        <OptionsWrapper>
          <OptionsMenu menuItems={MENU_ITEMS} />
        </OptionsWrapper>
        <Strip>
          <Title>{title}</Title>
          {creditCard && (
            <CreditCard cardColor={creditCard.color}>
              {creditCard.type && <CreditCardType>{getCreditCardType(creditCard.type)}</CreditCardType>}
              {creditCard.number && (
                <CreditCardNumber cardColor={creditCard.color}>{creditCard.number}</CreditCardNumber>
              )}
            </CreditCard>
          )}
        </Strip>
        <Cost>
          <CostPrice>
            {priceDisplay || price} {currencyDisplay || currency}
          </CostPrice>
          <CostFrequency>/ {getFrequency(frequency)}</CostFrequency>
        </Cost>
        <Tags>
          {tags?.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </Tags>
      </Card>
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} content={EDIT_MODAL} />
      <Modal
        isOpen={isDeleting}
        confirmation
        type="alert"
        onCancel={() => setIsDeleting(false)}
        onConfirm={handleDestroySubscription}
        content={REMOVE_MODAL}
      />
    </>
  );
};

export default SubscriptionCard;
