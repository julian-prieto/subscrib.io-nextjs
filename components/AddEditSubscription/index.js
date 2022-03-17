import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import { GET_SUBSCRIPTION_ASSETS, GET_SUBSCRIPTIONS } from "graphql/queries";
import { CREATE_SUBSCRIPTION, UPDATE_SUBSCRIPTION_BY_ID } from "graphql/mutations";
import { Button, Input } from "ui";
import { Wrapper, Actions, Form } from "./styled";
import { EMPTY_FIELD, FREQUENCIES, getDirtyValues } from "utils";
import { Dropdown } from "components";
import { useUserPreferences } from "hooks";

const AddEditSubscription = ({ subscription, onClose }) => {
  const { preferredCurrency } = useUserPreferences();

  const { data: dataQuery } = useQuery(GET_SUBSCRIPTION_ASSETS);
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
    control,
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
      : {
          frequency: "MONTHLY",
        },
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
            const { subscriptions } = cache.readQuery({
              query: GET_SUBSCRIPTIONS,
              variables: { convertToCurrency: preferredCurrency },
            });
            console.log({ subscriptions });
            cache.writeQuery({
              query: GET_SUBSCRIPTIONS,
              variables: { convertToCurrency: preferredCurrency },
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
          labelSize="2xl"
          placeholder="e.g. Netflix"
          {...register("title", { required: true, minLength: 2, maxLength: 25 })}
          error={errors.title && <span>This field is required</span>}
        />
        <Input
          label="Price"
          labelSize="2xl"
          placeholder="e.g. 9.99"
          {...register("price", { required: true, minLength: 1, maxLength: 25 })}
          error={errors.price && <span>This field is required</span>}
        />
        <Controller
          control={control}
          name="currency"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              labelSize="2xl"
              label="Currency"
              options={dataQuery?.currencies}
              value={value}
              onChange={onChange}
              renderOption={(option) => `[${option.id}] - ${option.name}`}
            />
          )}
        />
        <Controller
          control={control}
          name="frequency"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              labelSize="2xl"
              label="Frequency"
              options={Object.keys(FREQUENCIES).map((freq) => freq)}
              value={value}
              onChange={onChange}
              renderOption={(option) => option}
            />
          )}
        />
        <Controller
          control={control}
          name="creditCardId"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              labelSize="2xl"
              label="Credit Card"
              options={dataQuery?.creditCards}
              value={value}
              onChange={onChange}
              allowEmptyValue
              renderOption={(option) => `${option.type} [${option.number}]`}
            />
          )}
        />
        <Input
          label="Tags"
          labelSize="2xl"
          {...register("tags", {
            required: false,
          })}
          error={errors.name && "This field is required"}
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
