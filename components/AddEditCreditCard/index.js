import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreditCard, ColorSelector } from "components";
import { CREATE_CREDIT_CARD } from "graphql/mutations";
import { GET_CREDIT_CARDS } from "graphql/queries";
import { useAuth } from "hooks";
import { Button, Input } from "ui";
import { Card, H1, H2, Form, Actions, Grid } from "./styled";

const ERROR_MESSAGES = {
  type: {
    atLeastOneValue: "All fields can't be empty.",
    minLength: "Minimum length: 2",
    maxLength: "Maximum length: 20",
  },
  number: {
    atLeastOneValue: "All fields can't be empty.",
    minLength: "Minimum length: 1",
    maxLength: "Maximum length: 4",
  },
};

const AddEditCreditCard = () => {
  const { user } = useAuth();

  const { data: dataQuery, loading: loadingQuery } = useQuery(GET_CREDIT_CARDS, { skip: !user });
  const [
    createCreditCard,
    { data: dataCreateMutation, loading: loadingCreateMutation, called: calledCreateMutation },
  ] = useMutation(CREATE_CREDIT_CARD);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (form) => {
    createCreditCard({
      variables: { type: form.type, color: form.color, number: form.number },
      update: (cache, { data: { createCreditCard } }) => {
        try {
          const { creditCards } = cache.readQuery({ query: GET_CREDIT_CARDS });
          cache.writeQuery({
            query: GET_CREDIT_CARDS,
            data: {
              creditCards: [...creditCards, createCreditCard],
            },
          });
        } catch (error) {
          console.log("Error mutating GQL Cache:", error);
        }
      },
    });
  };

  const formHasErrors = !!Object.keys(errors).length;

  useEffect(() => {
    if (calledCreateMutation && dataCreateMutation && !loadingCreateMutation) {
      reset();
    }
  }, [dataCreateMutation, loadingCreateMutation, calledCreateMutation, reset]);

  return (
    <Card>
      <H1>CreditCards</H1>
      {loadingQuery && "Loading Credit Cards..."}
      <Grid>
        {dataQuery?.creditCards?.map((creditCard) => (
          <CreditCard key={creditCard.id} creditCard={creditCard} allowDestroy allowEdit />
        ))}
      </Grid>
      <H2>Create Credit Card</H2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          labelSize="2xl"
          label="Name / Type"
          placeholder="e.g. VISA"
          {...register("type", {
            required: false,
            minLength: 2,
            maxLength: 15,
            validate: {
              atLeastOneValue: (value) => !!(value || getValues("type")),
            },
          })}
          error={errors.type && ERROR_MESSAGES.type[errors.type.type]}
          disabled={loadingCreateMutation}
        />

        <Input
          labelSize="2xl"
          label="Number"
          placeholder="e.g. 2029"
          {...register("number", {
            required: false,
            minLength: 1,
            maxLength: 4,
            validate: {
              atLeastOneValue: (value) => !!(value || getValues("type")),
            },
          })}
          error={errors.number && ERROR_MESSAGES.number[errors.number.type]}
          disabled={loadingCreateMutation}
        />
        <ColorSelector onChange={(v) => setValue("color", v)} />
        <Actions>
          <Button
            type="submit"
            isLoading={loadingCreateMutation}
            disabled={loadingCreateMutation || formHasErrors}
          >
            ADD CREDIT CARD
          </Button>
        </Actions>
      </Form>
    </Card>
  );
};

export default AddEditCreditCard;
