import { gql } from "@apollo/client";
import {
  FRAGMENT_SUBSCRIPTION,
  FRAGMENT_CREDIT_CARD,
  FRAGMENT_TAG,
  FRAGMENT_USER,
  FRAGMENT_CURRENCY,
} from "./fragments";

/* CURRENCIES */

export const GET_CURRENCIES = gql`
  ${FRAGMENT_CURRENCY}
  query GetCurrencies {
    currencies {
      ...CurrencyParts
    }
  }
`;

/* SUBSCRIPTIONS */

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
  query GetSubscriptions($convertToCurrency: String) {
    subscriptions(convertToCurrency: $convertToCurrency) {
      ...SubscriptionParts
    }
  }
`;

export const GET_SUBSCRIPTION_ASSETS = gql`
  ${FRAGMENT_CREDIT_CARD}
  ${FRAGMENT_TAG}
  ${FRAGMENT_CURRENCY}
  query GetCreditCardsAndTags {
    currencies {
      ...CurrencyParts
    }
    creditCards {
      ...CreditCardParts
    }
    tags {
      ...TagParts
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
