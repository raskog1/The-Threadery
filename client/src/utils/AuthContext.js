import React, { useEffect, useReducer } from "react";

let reducer = (auth, newAuth) => {
  if (newAuth === null) {
    localStorage.removeItem("auth");
    return initialAuth;
  }
  return { ...auth, ...newAuth };
};

const AuthContext = React.createContext();

const initialAuth = {
  token: null,
  isAuthenticated: null,
  loading: null,
  user: null,
};

const localAuth = JSON.parse(localStorage.getItem("auth"));

function AuthProvider(props) {
  const [auth, setAuth] = useReducer(reducer, localAuth || initialAuth);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
