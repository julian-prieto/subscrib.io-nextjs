import { gql } from "@apollo/client";
import { FRAGMENT_SUBSCRIPTION, FRAGMENT_CREDIT_CARD, FRAGMENT_TAG, FRAGMENT_USER } from "./fragments";

export const GET_ME = gql`
  ${FRAGMENT_USER}
  query GetMe {
    me {
      ...UserParts
    }
  }
`;

/* SUBSCRIPTIONS */

export const GET_SUBSCRIPTIONS = gql`
  ${FRAGMENT_SUBSCRIPTION}
  query GetSubscriptions {
    subscriptions {
      ...SubscriptionParts
    }
  }
`;

/* CREDIT CARDS */

export const GET_CREDIT_CARDS = gql`
  ${FRAGMENT_CREDIT_CARD}
  query GetCreditCards {
    creditCards {
      ...CreditCardParts
    }
  }
`;

export const GET_CREDIT_CARD_BY_ID = gql`
  ${FRAGMENT_CREDIT_CARD}
  query GetCreditCardById($id: ID!) {
    creditCard(id: $id) {
      ...CreditCardParts
    }
  }
`;

/* TAGS */

export const GET_TAGS = gql`
  ${FRAGMENT_TAG}
  query GetTags {
    tags {
      ...TagParts
    }
  }
`;
