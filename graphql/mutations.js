import { gql } from "@apollo/client";
import { FRAGMENT_SUBSCRIPTION, FRAGMENT_CREDIT_CARD, FRAGMENT_TAG } from "./fragments";

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
      frequency: $frequency
      creditCardId: $creditCardId
      tags: $tags
      image: $image
    ) {
      ...SubscriptionParts
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
      frequency: $frequency
      creditCardId: $creditCardId
      tags: $tags
      image: $image
    ) {
      ...SubscriptionParts
    }
  }
`;

export const DELETE_SUBSCRIPTION_BY_ID = gql`
  ${FRAGMENT_SUBSCRIPTION}
  mutation DeleteSubscriptionById($id: ID!) {
    deleteSubscriptionById(id: $id) {
      ...SubscriptionParts
    }
  }
`;

/* CREDIT CARDS */
export const CREATE_CREDIT_CARD = gql`
  ${FRAGMENT_CREDIT_CARD}

  mutation CreateCreditCard($type: String!, $number: Number, $color: String) {
    createCreditCard(type: $type, number: $number, color: $color) {
      ...CreditCardParts
    }
  }
`;

export const UPDATE_CREDIT_CARD_BY_ID = gql`
  ${FRAGMENT_CREDIT_CARD}
  mutation UpdateCreditCardById($id: ID!, $type: String!, $number: Number, $color: String) {
    updateCreditCardById(id: $id, type: $type, number: $number, color: $color) {
      ...CreditCardParts
    }
  }
`;

export const DELETE_CREDIT_CARD_BY_ID = gql`
  ${FRAGMENT_CREDIT_CARD}
  mutation DeleteCreditCardById($id: ID!) {
    deleteCreditCardById(id: $id) {
      ...CreditCardParts
    }
  }
`;

/* TAGS */
export const CREATE_TAG = gql`
  ${FRAGMENT_TAG}

  mutation CreateTag($name: String!) {
    createTag(name: $name) {
      ...TagParts
    }
  }
`;

export const UPDATE_TAG_BY_ID = gql`
  ${FRAGMENT_TAG}
  mutation UpdateTagById($id: ID!, $name: String!) {
    updateTagById(id: $id, name: $name) {
      ...TagParts
    }
  }
`;

export const DELETE_TAG_BY_ID = gql`
  ${FRAGMENT_TAG}
  mutation DeleteTagById($id: ID!) {
    deleteTagById(id: $id) {
      ...TagParts
    }
  }
`;
