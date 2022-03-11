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
