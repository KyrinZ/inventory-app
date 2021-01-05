import { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import { UserContext } from "../EntryPoint";

function PrivateRoute({ component, ...rest }) {
  const location = useLocation();
  const userObject = useContext(UserContext);

  return userObject.userData.isUserLoggedIn ? (
    <Route {...rest}>{component}</Route>
  ) : (
    <Redirect to={{ pathname: "/auth", state: { from: location } }} />
  );
}

export default PrivateRoute;
