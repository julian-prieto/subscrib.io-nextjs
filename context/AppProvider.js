import { useEffect, useState, useReducer } from "react";
import { AppContext, appReducer, INITIAL_STATE } from "context";
import { getUserToken } from "utils";

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);
  const [user, setUser] = useState(null);
  const [userIsLoading, setUserIsLoading] = useState(false);

  useEffect(() => {
    const storageToken = getUserToken();

    if (storageToken) {
      setUserIsLoading(true);
    }
  }, []);

  const setUserOnAuthChange = (user) => {
    setUser(user);
    setUserIsLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        user,
        userIsLoading,
        setUserOnAuthChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
