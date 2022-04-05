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

export const getUserToken = () => {
  if (typeof window === "undefined") return;

  return localStorage.getItem("token");
};

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

export const getDirtyValues = (variables, dirtyFields, ignoreFields) => {
  return Object.entries(variables).reduce((prev, [currKey, currValue]) => {
    if (ignoreFields.indexOf(currKey) === -1 && !dirtyFields[currKey]) {
      return { ...prev };
    }

    return {
      ...prev,
      [currKey]: currValue === EMPTY_FIELD ? null : currValue,
    };
  }, {});
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

export const getCostByPreference = (cost, preferredCurrency) => {
  if (!cost || !preferredCurrency) {
    return {};
  }

  const { currency, value } = cost.find((c) => c.currency === preferredCurrency);

  return {
    currency,
    value,
  };
};

export const getCostByFrequency = (subscription, preferredCurrency, frequency) => {
  const cost = getCostByPreference(subscription.cost, preferredCurrency);

  switch (subscription.frequency) {
    case "YEARLY":
      return frequency === "YEARLY"
        ? cost.value
        : frequency === "MONTHLY"
        ? cost.value / 12
        : cost.value / 365;
    case "MONTHLY":
      return frequency === "YEARLY"
        ? cost.value * 12
        : frequency === "MONTHLY"
        ? cost.value
        : cost.value / 30;
    case "DAILY":
      return frequency === "YEARLY"
        ? cost.value * 365
        : frequency === "MONTHLY"
        ? cost.value * 30
        : cost.value;
    default:
      return cost.value;
  }
};

export const sumBy = (objects, costFrequency, preferredCurrency = "USD") => {
  if (Array.isArray(objects))
    return round(_sumBy(objects, (p) => getCostByFrequency(p, preferredCurrency, costFrequency)));

  return Object.entries(objects).reduce((prev, [currGroup, currValue]) => {
    return {
      ...prev,
      [currGroup]: { currency: preferredCurrency, value: sumBy(currValue, costFrequency, preferredCurrency) },
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
