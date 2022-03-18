import { gql } from "@apollo/client";

export const FRAGMENT_CURRENCY = gql`
  fragment CurrencyParts on Currency {
    __typename
    id
    name
  }
`;

export const FRAGMENT_USER = gql`
  fragment UserParts on User {
    __typename
    email
    name
    givenName
    familyName
    picture
  }
`;

export const FRAGMENT_CREDIT_CARD = gql`
  fragment CreditCardParts on CreditCard {
    __typename
    id
    type
    number
    color
  }
`;

export const FRAGMENT_TAG = gql`
  fragment TagParts on Tag {
    __typename
    id
    name
  }
`;

export const FRAGMENT_SUBSCRIPTION = gql`
  ${FRAGMENT_CREDIT_CARD}
  ${FRAGMENT_TAG}
  fragment SubscriptionParts on Subscription {
    __typename
    id
    title
    price
    priceDisplay
    currency
    currencyDisplay
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
