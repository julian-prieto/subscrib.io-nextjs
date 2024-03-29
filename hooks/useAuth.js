import { useContext } from "react";
import { AppContext } from "context";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { GET_ME } from "graphql/queries";
import { setUserToken, removeUserToken } from "utils";
import { graphqlClient } from "graphql/client";
import { useUserPreferences } from "hooks";

const refreshTokenSetup = (res) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    setTimeout(refreshToken, refreshTiming);
  };
  setTimeout(refreshToken, refreshTiming);
};

const useAuth = ({ onSuccess, onFailure, onLogoutSuccess } = {}) => {
  const { user, userIsLoading, setUserOnAuthChange } = useContext(AppContext);
  const { theme } = useUserPreferences();

  const handleSuccess = async (res) => {
    const token = res.tokenId;

    const client = graphqlClient({ authorization: `Bearer ${token}` });
    const { data } = await client.query({ query: GET_ME });

    setUserOnAuthChange(data.me);
    setUserToken(token);
    refreshTokenSetup(res);

    if (onSuccess) {
      onSuccess(res);
    }
  };

  const handleLogoutSuccess = (res) => {
    removeUserToken();
    setUserOnAuthChange(null);
    if (onLogoutSuccess) {
      onLogoutSuccess(res);
    }
  };

  const handleFailure = (res) => {
    if (onFailure) {
      onFailure(res);
    }
  };

  const LoginButton = () => (
    <GoogleLogin
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      buttonText="Login"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      isSignedIn={true}
      theme={theme}
    />
  );

  const LogoutButton = () => (
    <GoogleLogout
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={handleLogoutSuccess}
      theme={theme}
    />
  );

  return {
    LoginButton,
    LogoutButton,
    user,
    userIsLoading,
  };
};

export default useAuth;
