import { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import AuthenticationPage from "../Authentication/AuthenticationPage";

import { UserContext } from "../EntryPoint";

function AuthRoute({ ...rest }) {
  const location = useLocation();
  const userObject = useContext(UserContext);
  const { from } = location.state || { from: { pathname: "/inventory" } };
  return !userObject.userData.isUserLoggedIn ? (
    <Route {...rest}>
      <AuthenticationPage />
    </Route>
  ) : (
    <Redirect to={from} />
  );
}

export default AuthRoute;
