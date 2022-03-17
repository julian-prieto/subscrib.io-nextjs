import { groupBy as _groupBy, sumBy as _sumBy } from "lodash";

export const FREQUENCIES = {
  DAILY: "day",
  MONTHLY: "month",
  YEARLY: "year",
};

const CARD_TYPES = {
  VISA: "VISA",
  AMERICANEXPRESS: "AMEX",
  MASTERCARD: "MC",
};

export const EMPTY_FIELD = "----------";

export const SUMMARY_VIEWS = {
  DEFAULT: "DEFAULT",
  UNKNOWN: "UNKNOWN",
};

export const getUserToken = () => localStorage.getItem("token");

export const setUserToken = (token) => localStorage.setItem("token", token);

export const removeUserToken = () => localStorage.removeItem("token");

export const getFrequency = (frequency) => {
  if (FREQUENCIES[frequency]) return FREQUENCIES[frequency];
  return frequency;
};

export const getCreditCardType = (type) => {
  if (!type) return "";

  if (CARD_TYPES[type.toUpperCase()]) return CARD_TYPES[type.toUpperCase()];

  if (type.length > 4) {
    const hasMultipleWords = type.split(" ").length > 1;
    if (hasMultipleWords) {
      return type
        .split(" ")
        .map((word) => word[0])
        .join("");
    } else {
      return type.substr(0, 4).toUpperCase();
    }
  }
  return type.toUpperCase();
};

export const getDirtyValues = (variables, dirtyFields) => {
  return Object.keys(dirtyFields).reduce(
    (acc, current) => ({
      ...acc,
      [current]: variables[current] === EMPTY_FIELD ? null : variables[current],
    }),
    {}
  );
};

export const round = (value, decimals = 2) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

export const groupBy = (items, field) => {
  if (!Array.isArray(items)) {
    return Object.entries(items).reduce((prev, [currGroup, currValue]) => {
      return {
        ...prev,
        [currGroup]: groupBy(currValue, field),
      };
    }, {});
  }
  return _groupBy(items, field);
};

export const getCostByFrequency = (subscription, frequency) => {
  switch (subscription.frequency) {
    case "YEARLY":
      return frequency === "YEARLY"
        ? subscription.price
        : frequency === "MONTHLY"
        ? subscription.price / 12
        : subscription.price / 365;
    case "MONTHLY":
      return frequency === "YEARLY"
        ? subscription.price * 12
        : frequency === "MONTHLY"
        ? subscription.price
        : subscription.price / 30;
    case "DAILY":
      return frequency === "YEARLY"
        ? subscription.price * 365
        : frequency === "MONTHLY"
        ? subscription.price * 30
        : subscription.price;
    default:
      return subscription.price;
  }
};

export const sumBy = (objects, costFrequency) => {
  if (Array.isArray(objects)) return round(_sumBy(objects, (p) => getCostByFrequency(p, costFrequency)));

  return Object.entries(objects).reduce((prev, [currGroup, currValue]) => {
    return {
      ...prev,
      [currGroup]: sumBy(currValue, costFrequency),
    };
  }, {});
};

export const getCreditCardsFromSubscriptionList = (subscriptions = []) => {
  return subscriptions.reduce((prev, curr) => {
    const creditCardID = curr.creditCard
      ? `${curr.creditCard.number}_${curr.creditCard.type}`
      : "NO_CREDITCARD";

    return { ...prev, [creditCardID]: curr.creditCard };
  }, {});
};
