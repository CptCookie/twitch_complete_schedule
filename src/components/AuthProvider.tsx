import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../Twitch/twitch.interface";
import { validate_user } from "../Twitch";

const localStorageKey = "twitch_auth";

interface AuthContext {
  auth?: Auth;
  setAuth: (auth: Auth) => void;
}

const authContext = React.createContext<AuthContext>({
  auth: undefined,
  setAuth: (x) => {},
});

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<Auth | undefined>(undefined);

  useEffect(() => {
    const local_token = window.localStorage.getItem(localStorageKey);

    if (local_token) {
      const token: Auth = JSON.parse(local_token);

      if (local_token) {
        console.log("validate token");
        validate_user(token.access_token)
          .then((resp) => {
            // token valid, put into the Context for the App
            console.log("token is fine");
            setAuth(token);
          })
          .catch(() => {
            // could not validate, remove tht token from the storage
            console.log("token is old");
            window.localStorage.removeItem(localStorageKey);
          });
      }
    }
  }, []);

  const setNewToken = (new_auth: Auth) => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(new_auth));
    setAuth(new_auth);
  };

  console.log("render auth Provider", auth);

  return (
    <authContext.Provider value={{ auth: auth, setAuth: setNewToken }}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  return useContext(authContext);
};

export { useAuth, AuthProvider };
