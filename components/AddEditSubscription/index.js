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
import ManageTags from "./ManageTags";

const AddEditSubscription = ({ subscription, onClose }) => {
  const { preferredCurrency } = useUserPreferences();

  const { data: dataQuery, loading: loadingQuery } = useQuery(GET_SUBSCRIPTION_ASSETS);
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
      returnCurrency: preferredCurrency,
    };

    if (subscription) {
      const mutationVariables = getDirtyValues(variables, dirtyFields, ["id", "returnCurrency"]);

      editSubscription({
        variables: mutationVariables,
        update: (
          cache,
          {
            data: {
              updateSubscriptionById: { id, currencyDisplay },
            },
          }
        ) => {
          const normalizedCache = cache.extract();
          const cacheIdsToRemove = Object.keys(normalizedCache).filter(
            (key) => key.indexOf(id) !== -1 && key.indexOf(currencyDisplay) === -1
          );
          cacheIdsToRemove
            .map((a) => a.split(":")[2])
            .map((b) => (b === "null" ? null : b))
            .forEach((param) => {
              cache.evict({
                id: "ROOT_QUERY",
                fieldName: "subscriptions",
                args: { convertToCurrency: param },
              });
            });
        },
      });
    } else {
      createSubscription({
        variables,
        update: (cache, { data: { createSubscription } }) => {
          window.APOLLO_CACHE = cache;
          try {
            const { subscriptions } = cache.readQuery({
              query: GET_SUBSCRIPTIONS,
              variables: { convertToCurrency: preferredCurrency },
            });
            cache.writeQuery({
              query: GET_SUBSCRIPTIONS,
              variables: { convertToCurrency: preferredCurrency },
              data: {
                subscriptions: [...subscriptions, createSubscription],
              },
            });
            const normalizedCache = cache.extract();

            const cacheIdsToRemove = Object.keys(normalizedCache)
              .filter((key) => key.includes("Subscription"))
              .reduce((p, a) => {
                const [, , currency] = a.split(":");
                const preferencesCurrency = `${preferredCurrency}`;
                return p.includes(currency) ? p : currency === preferencesCurrency ? p : [...p, currency];
              }, []);

            cacheIdsToRemove.forEach((param) => {
              cache.evict({
                id: "ROOT_QUERY",
                fieldName: "subscriptions",
                args: { convertToCurrency: param === "null" ? null : param },
              });
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
          type="number"
          {...register("price", {
            required: { value: true, message: "Price is required" },
            minLength: { value: 1, message: "Price length is too short" },
            maxLength: { value: 25, message: "Price length is too long" },
            validate: {
              isPositiveNumber: (value) => value > 0 || "Price should be at least zero",
            },
          })}
          error={errors.price && errors?.price?.message}
        />
        <Controller
          control={control}
          name="currency"
          rules={{
            required: {
              value: true,
              message: "Please select a currency",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Dropdown
              labelSize="2xl"
              label="Currency"
              options={dataQuery?.currencies}
              value={value}
              onChange={onChange}
              renderOption={(option) => `[${option.id}] - ${option.name}`}
              loading={loadingQuery}
              placeholder="Please select a currency"
              error={errors.currency && errors?.currency?.message}
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
              loading={loadingQuery}
              placeholder="Please select a credit card"
            />
          )}
        />
        <Controller
          control={control}
          name="tags"
          render={({ field: { onChange, value } }) => {
            const tagIds = (value && JSON.parse(value)) || [];
            const tags = tagIds.reduce((prev, curr) => {
              const tag = dataQuery?.tags?.find((t) => t.id === curr);
              if (tag) return [...prev, tag];
              return prev;
            }, []);

            return <ManageTags tags={tags} onChange={onChange} />;
          }}
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
