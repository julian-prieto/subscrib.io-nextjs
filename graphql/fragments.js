import { gql } from "@apollo/client";

export const FRAGMENT_USER = gql`
  fragment UserParts on User {
    email
    name
    givenName
    familyName
    picture
  }
`;

export const FRAGMENT_CREDIT_CARD = gql`
  fragment CreditCardParts on CreditCard {
    id
    type
    number
  }
`;

export const FRAGMENT_TAG = gql`
  fragment TagParts on Tag {
    id
    name
  }
`;

export const FRAGMENT_SUBSCRIPTION = gql`
  ${FRAGMENT_CREDIT_CARD}
  ${FRAGMENT_TAG}
  fragment SubscriptionParts on Subscription {
    id
    title
    price
    currency
    frequency
    image
    creditCard {
      ...CreditCardParts
    }
    tags {
      ...TagParts
    }
  }
`;
