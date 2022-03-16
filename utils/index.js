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

export const round = (value, decimals) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};
