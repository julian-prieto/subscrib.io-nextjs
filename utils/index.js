const FRECUENCIES = {
  DAILY: "day",
  MONTHLY: "month",
  YEARLY: "year",
};

const CARD_TYPES = {
  VISA: "VISA",
  AMERICANEXPRESS: "AMEX",
  MASTERCARD: "MC",
};

export const withOpacity = (percent, color) => {
  if (percent >= 0 && percent <= 100) {
    let hex = Math.ceil(Number((percent / 100) * 255))
      .toString(16)
      .toUpperCase();
    if (hex.length === 1) {
      hex = `0${hex}`;
    }
    return color + hex;
  }
  return `${color}FF`;
};

export const getUserToken = () => localStorage.getItem("token");

export const setUserToken = (token) => localStorage.setItem("token", token);

export const removeUserToken = (token) => localStorage.removeItem("token");

export const getFrequency = (frequency) => {
  if (FRECUENCIES[frequency]) return FRECUENCIES[frequency];
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
