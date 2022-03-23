import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_SUBSCRIPTION_BY_ID } from "graphql/mutations";
import { Modal, AddEditSubscription } from "components";
import { H2, ModalMessage } from "./styled";
import SubscriptionGridItem from "./SubscriptionGridItem";
import SubscriptionListItem from "./SubscriptionListItem";
import { useRouter } from "next/router";

const Components = {
  GRID: SubscriptionGridItem,
  LIST: SubscriptionListItem,
};
const Subscription = ({ subscription, layout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const [deleteSubscription, { loading: loadingDeleteMutation }] = useMutation(DELETE_SUBSCRIPTION_BY_ID);

  const handleDestroySubscription = () => {
    deleteSubscription({
      variables: { id: subscription.id },
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

  const handleTagClick = (tag) => {
    const existingTags = router.query.tags;

    if (existingTags?.includes(tag.id)) {
      return;
    }

    const newTags = existingTags ? `${existingTags},${tag.id}` : tag.id;
    router.query.tags = newTags;
    router.push(router);
  };

  const EDIT_MODAL = {
    title: (
      <H2>
        Edit <i>{subscription.title}</i>
      </H2>
    ),
    body: <AddEditSubscription subscription={subscription} onClose={() => setIsEditing(false)} />,
  };

  const REMOVE_MODAL = {
    title: <H2>Remove</H2>,
    message: (
      <ModalMessage>
        Are you sure you want to remove the <strong>{subscription.title}</strong> subscription?
      </ModalMessage>
    ),
    confirm: "REMOVE",
    cancel: "CANCEL",
  };

  const SubscriptionComponent = Components[layout];

  return (
    <>
      <SubscriptionComponent
        subscription={subscription}
        loadingDeleteMutation={loadingDeleteMutation}
        onEdit={() => setIsEditing(true)}
        onRemove={() => setIsDeleting(true)}
        onTagClick={handleTagClick}
      />
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

export default Subscription;
