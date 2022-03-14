import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FaTrash, FaPen, FaSpinner, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { DELETE_CREDIT_CARD_BY_ID, UPDATE_CREDIT_CARD_BY_ID } from "graphql/mutations";
import { Wrapper, CardType, CardNumber, CardActions, CardIcon, CardNumberInput, CardTypeInput } from "./styled";

const CreditCard = ({ creditCard, allowDestroy, allowEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [deleteCreditCard, { loading: loadingDeleteMutation }] = useMutation(DELETE_CREDIT_CARD_BY_ID);
  const [editCreditCard, { data: dataEditMutation, loading: loadingEditMutation, called: calledEditMutation }] =
    useMutation(UPDATE_CREDIT_CARD_BY_ID);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm();

  const handleEditCreditCard = (form) => {
    editCreditCard({
      variables: { id: creditCard.id, type: form.type, number: form.number },
      refetchQueries: ["GetCreditCards"],
    });
  };

  const handleCancelEditCreditCard = useCallback(() => {
    reset();
    setIsEditing(false);
  }, [setIsEditing, reset]);

  const handleDestroyCreditCard = () => {
    deleteCreditCard({ variables: { id: creditCard.id }, refetchQueries: ["GetCreditCards", "GetSubscriptions"] });
  };

  const handleUserKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(handleEditCreditCard)();
    }
  };

  useEffect(() => {
    if (calledEditMutation && dataEditMutation && !loadingEditMutation) {
      handleCancelEditCreditCard();
    }
  }, [dataEditMutation, loadingEditMutation, calledEditMutation, handleCancelEditCreditCard]);

  useEffect(() => {
    if (isEditing) {
      setFocus("number");
    }
  }, [isEditing, setFocus]);

  return (
    <Wrapper>
      {isEditing ? (
        <>
          <CardNumber color={creditCard.color}>
            <CardNumberInput
              onKeyPress={handleUserKeyPress}
              error={errors.number}
              {...register("number", {
                value: creditCard.number,
                maxLength: 4,
              })}
            />
          </CardNumber>
          <CardType>
            <CardTypeInput
              onKeyPress={handleUserKeyPress}
              error={errors.type}
              {...register("type", {
                value: creditCard.type,
                maxLength: 20,
                validate: {
                  atLeastOneValue: (value) => !!(value || getValues("number")),
                },
              })}
            />
          </CardType>
          <CardActions>
            <CardIcon
              isLoading={loadingEditMutation}
              onClick={handleSubmit(handleEditCreditCard)}
              color="success"
              top={!!allowDestroy}
            >
              {loadingEditMutation ? <FaSpinner /> : <FaCheck />}
            </CardIcon>
            <CardIcon
              isLoading={loadingDeleteMutation}
              onClick={handleCancelEditCreditCard}
              color="alert"
              bottom={!!allowEdit}
            >
              {loadingDeleteMutation ? <FaSpinner /> : <IoClose />}
            </CardIcon>
          </CardActions>
        </>
      ) : (
        <>
          {creditCard.number && <CardNumber color={creditCard.color}>{creditCard.number}</CardNumber>}
          {creditCard.type && <CardType>{creditCard.type}</CardType>}
          <CardActions>
            {allowEdit && (
              <CardIcon onClick={() => setIsEditing(true)} color="success" top={!!allowDestroy}>
                <FaPen />
              </CardIcon>
            )}
            {allowDestroy && (
              <CardIcon
                isLoading={loadingDeleteMutation}
                onClick={handleDestroyCreditCard}
                color="alert"
                bottom={!!allowEdit}
              >
                {loadingDeleteMutation ? <FaSpinner /> : <FaTrash />}
              </CardIcon>
            )}
          </CardActions>
        </>
      )}
    </Wrapper>
  );
};

export default CreditCard;
