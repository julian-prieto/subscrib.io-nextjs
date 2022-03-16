import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GET_CREDIT_CARDS_AND_TAGS, GET_SUBSCRIPTIONS } from "graphql/queries";
import { CREATE_SUBSCRIPTION, UPDATE_SUBSCRIPTION_BY_ID } from "graphql/mutations";
import { Button, Input } from "ui";
import { Wrapper, Actions, Form } from "./styled";
import { EMPTY_FIELD, FREQUENCIES, getDirtyValues } from "utils";
import { Dropdown } from "components";

const AddEditSubscription = ({ subscription, onClose }) => {
  const { data: dataQuery, loading: loadingQuery } = useQuery(GET_CREDIT_CARDS_AND_TAGS);
  const [
    editSubscription,
    { data: dataEditMutation, loading: loadingEditMutation, called: calledEditMutation },
  ] = useMutation(UPDATE_SUBSCRIPTION_BY_ID);
  const [
    createSubscription,
    { data: dataCreateMutation, loading: loadingCreateMutation, called: calledCreateMutation },
  ] = useMutation(CREATE_SUBSCRIPTION);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: subscription
      ? {
          title: subscription.title,
          price: subscription.price,
          currency: subscription.currency,
          frequency: subscription.frequency,
          creditCardId: subscription.creditCard ? subscription.creditCard.id : EMPTY_FIELD,
          tags: subscription.tags ? `[${subscription?.tags?.map((t) => `"${t.id}"`).join(", ")}]` : "[]",
        }
      : null,
  });

  const onSubmit = (form) => {
    const variables = {
      id: subscription && subscription.id,
      title: form.title,
      price: Number(form.price),
      currency: form.currency,
      frequency: form.frequency,
      creditCardId: form.creditCardId,
      tags: form.tags ? JSON.parse(form.tags) : [],
    };

    if (subscription) {
      editSubscription({
        variables: { id: subscription.id, ...getDirtyValues(variables, dirtyFields) },
      });
    } else {
      createSubscription({
        variables,
        update: (cache, { data: { createSubscription } }) => {
          try {
            const { subscriptions } = cache.readQuery({ query: GET_SUBSCRIPTIONS });
            cache.writeQuery({
              query: GET_SUBSCRIPTIONS,
              data: {
                subscriptions: [...subscriptions, createSubscription],
              },
            });
          } catch (error) {
            console.log("Error mutating GQL Cache:", error);
          }
        },
      });
    }
  };

  const formHasErrors = !!Object.keys(errors).length;

  useEffect(() => {
    if (calledEditMutation && dataEditMutation && !loadingEditMutation) {
      onClose();
    }
  }, [dataEditMutation, loadingEditMutation, calledEditMutation, onClose]);

  useEffect(() => {
    if (calledCreateMutation && dataCreateMutation && !loadingCreateMutation) {
      onClose();
    }
  }, [dataCreateMutation, loadingCreateMutation, calledCreateMutation, onClose]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Title"
          labelSize="4xl"
          {...register("title", { required: true, minLength: 2, maxLength: 25 })}
          error={errors.title && <span>This field is required</span>}
        />
        <Input
          label="Price"
          labelSize="4xl"
          {...register("price", { required: true, minLength: 1, maxLength: 25 })}
          error={errors.price && <span>This field is required</span>}
        />
        <Input
          label="Currency"
          labelSize="4xl"
          {...register("currency", {
            required: true,
            minLength: 3,
            maxLength: 3,
          })}
          error={errors.currency && <span>This field is required</span>}
        />
        <label>Frequency</label>
        <select {...register("frequency", { required: false })}>
          {Object.keys(FREQUENCIES).map((freq) => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </select>
        <br />
        {dataQuery?.creditCards && (
          <>
            <label>Credit Card</label>
            <select {...register("creditCardId", { required: false })}>
              <option value={EMPTY_FIELD}>{EMPTY_FIELD}</option>
              {dataQuery?.creditCards?.map((cc) => (
                <option key={cc.id} value={cc.id}>
                  {cc.type} [{cc.number}]
                </option>
              ))}
            </select>
          </>
        )}
        <Input
          label="Tags"
          labelSize="4xl"
          {...register("tags", {
            required: false,
          })}
          error={errors.name && "This field is required"}
        />
        <Dropdown
          labelSize="4xl"
          label="Credit Card"
          options={dataQuery?.creditCards}
          value={subscription?.creditCard ? subscription.creditCard.id : EMPTY_FIELD}
          onChange={(v) => setValue("creditCardId", v)}
        />
        <Actions>
          <Button type="button" color="secondary" onClick={onClose}>
            CANCEL
          </Button>
          <Button
            type="submit"
            color="primary"
            isLoading={loadingEditMutation || loadingCreateMutation}
            disabled={loadingEditMutation || loadingCreateMutation || formHasErrors}
          >
            {subscription ? "SAVE" : "CREATE"}
          </Button>
        </Actions>
      </Form>
    </Wrapper>
  );
};

export default AddEditSubscription;
