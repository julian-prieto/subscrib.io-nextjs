import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CreditCard, ColorSelector } from "components";
import { CREATE_CREDIT_CARD } from "graphql/mutations";
import { GET_CREDIT_CARDS } from "graphql/queries";
import { useAuth } from "hooks";
import { Button, Input } from "ui";
import { Card, H1, H2, Form, Actions, Grid } from "./styled";

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
          label="Credit card name / type"
          {...register("type", { required: false, minLength: 2, maxLength: 15 })}
          error={errors.type && "Error!"}
          disabled={loadingCreateMutation}
        />

        <Input
          label="4 Digit identifier"
          {...register("number", { required: false, minLength: 4, maxLength: 4 })}
          error={errors.number && "Error!"}
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