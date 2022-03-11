import { gql } from "@apollo/client";
import { FRAGMENT_GENERIC_RESPONSE, FRAGMENT_SUBSCRIPTION, FRAGMENT_CREDIT_CARD, FRAGMENT_TAG } from "./fragments";

/* SUBSCRIPTIONS */
export const CREATE_SUBSCRIPTION = gql`
  ${FRAGMENT_SUBSCRIPTION}
  mutation CreateSubscription(
    $title: String!
    $price: Number!
    $currency: String!
    $frequency: String!
    $creditCardId: String
    $tags: [String]
    $image: [String]
  ) {
    createSubscription(
      title: $title
      price: $price
      currency: $currency
      frecuency: $frecuency
      creditCardId: $creditCardId
      tags: $tags
      image: $image
    ) {
      ...SubscriptionParts
      ...GenericResponseParts
    }
  }
`;

export const UPDATE_SUBSCRIPTION_BY_ID = gql`
  ${FRAGMENT_SUBSCRIPTION}
  mutation CreateSubscription(
    $id: ID!
    $title: String!
    $price: Number!
    $currency: String!
    $frequency: String!
    $creditCardId: String
    $tags: [String]
    $image: [String]
  ) {
    updateSubscriptionById(
      id: $id
      title: $title
      price: $price
      currency: $currency
      frecuency: $frecuency
      creditCardId: $creditCardId
      tags: $tags
      image: $image
    ) {
      ...SubscriptionParts
      ...GenericResponseParts
    }
  }
`;

export const DELETE_SUBSCRIPTION_BY_ID = gql`
  ${FRAGMENT_SUBSCRIPTION}
  ${FRAGMENT_GENERIC_RESPONSE}
  mutation DeleteSubscriptionById($id: ID!) {
    deleteSubscriptionById(id: $id) {
      ...GenericResponseParts
      ...SubscriptionParts
    }
  }
`;

/* CREDIT CARDS */
export const CREATE_CREDIT_CARD = gql`
  ${FRAGMENT_CREDIT_CARD}
  ${FRAGMENT_GENERIC_RESPONSE}

  mutation CreateCreditCard($type: String!, $number: Number) {
    createCreditCard(type: $type, number: $number) {
      ...CreditCardParts
      ...GenericResponseParts
    }
  }
`;

export const UPDATE_CREDIT_CARD_BY_ID = gql`
  ${FRAGMENT_SUBSCRIPTION}
  mutation UpdateCreditCardById($id: ID!, $type: String!, $number: Number) {
    updateCreditCardById(id: $id, type: $type, number: $number) {
      ...CreditCardParts
      ...GenericResponseParts
    }
  }
`;

export const DELETE_CREDIT_CARD_BY_ID = gql`
  ${FRAGMENT_SUBSCRIPTION}
  ${FRAGMENT_GENERIC_RESPONSE}
  mutation DeleteCreditCardById($id: ID!) {
    deleteCreditCardById(id: $id) {
      ...CreditCardParts
      ...GenericResponseParts
    }
  }
`;

/* TAGS */
export const CREATE_TAG = gql`
  ${FRAGMENT_TAG}
  ${FRAGMENT_GENERIC_RESPONSE}

  mutation CreateTag($type: String!, $number: Number) {
    createTag(type: $type, number: $number) {
      ...TagParts
      ...GenericResponseParts
    }
  }
`;

export const UPDATE_TAG_BY_ID = gql`
  ${FRAGMENT_SUBSCRIPTION}
  mutation UpdateTagById($id: ID!, $name: String!) {
    updateTagById(id: $id, name: $name) {
      ...TagParts
      ...GenericResponseParts
    }
  }
`;

export const DELETE_TAG_BY_ID = gql`
  ${FRAGMENT_SUBSCRIPTION}
  ${FRAGMENT_GENERIC_RESPONSE}
  mutation DeleteTagById($id: ID!) {
    deleteTagById(id: $id) {
      ...TagParts
      ...GenericResponseParts
    }
  }
`;
