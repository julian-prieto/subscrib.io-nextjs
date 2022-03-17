import { useEffect, useState, useReducer } from "react";
import { useStateWithStorage } from "hooks";
import { AppContext, appReducer, INITIAL_STATE } from "context";

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);
  const [user, setUser] = useState(null);

  const setUserOnAuthChange = (user) => setUser(user);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        user,
        setUserOnAuthChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
