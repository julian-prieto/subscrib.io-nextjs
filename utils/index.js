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
  PREFERENCES_CURRENCY_SELECTED: "PREFERENCES_CURRENCY_SELECTED",
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

export const getCostByFrequency = (subscription, priceField, frequency) => {
  switch (subscription.frequency) {
    case "YEARLY":
      return frequency === "YEARLY"
        ? subscription[priceField]
        : frequency === "MONTHLY"
        ? subscription[priceField] / 12
        : subscription[priceField] / 365;
    case "MONTHLY":
      return frequency === "YEARLY"
        ? subscription[priceField] * 12
        : frequency === "MONTHLY"
        ? subscription[priceField]
        : subscription[priceField] / 30;
    case "DAILY":
      return frequency === "YEARLY"
        ? subscription[priceField] * 365
        : frequency === "MONTHLY"
        ? subscription[priceField] * 30
        : subscription[priceField];
    default:
      return subscription[priceField];
  }
};

export const sumBy = (objects, costFrequency, priceField = "price") => {
  if (Array.isArray(objects))
    return round(_sumBy(objects, (p) => getCostByFrequency(p, priceField, costFrequency)));

  return Object.entries(objects).reduce((prev, [currGroup, currValue]) => {
    return {
      ...prev,
      [currGroup]: sumBy(currValue, costFrequency, priceField),
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
