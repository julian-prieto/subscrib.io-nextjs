export const INITIAL_STATE = {
  userPreferences: {
    theme: "light",
    preferredCurrency: null,
  },
};

export const ACTIONS = {
  CHANGE_THEME: "CHANGE_THEME",
  CHANGE_PREFERRED_CURRENCY: "CHANGE_PREFERRED_CURRENCY",
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_THEME:
      return {
        ...state,
        userPreferences: { ...state.userPreferences, theme: action.payload },
      };
    case ACTIONS.CHANGE_PREFERRED_CURRENCY:
      return {
        ...state,
        userPreferences: { ...state.userPreferences, preferredCurrency: action.payload },
      };
    default:
      return state;
  }
};

export default appReducer;
