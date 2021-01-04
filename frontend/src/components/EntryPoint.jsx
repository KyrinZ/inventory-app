import { Switch, Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";

// Components
import Inventory from "./Inventory/InventoryList/Inventory";
import History from "./Inventory/HistoryList/History";
import PrivateRoute from "./CustomRoutes/PrivateRoute";
import AuthRoute from "./CustomRoutes/AuthRoute";
import NavigationMenu from "./Inventory/NavigationBar/NavigationMenu";

// Utilities
import { axios } from "./utilities";

export const UserContext = React.createContext();

export default function EntryPoint() {
  const [userData, SetUserData] = useState({
    userId: null,
    username: null,
    isUserLoggedIn: false,
    dataArrived: false,
  });

  const authenticateUser = async () => {
    try {
      const response = await axios.post("user/verify/", {
        token: localStorage.getItem("auth-token"),
      });

      if (response.status === 200) {
        localStorage.setItem("auth-token", response.data.token);
        axios.defaults.headers["auth-token"] = response.data.token;
        const { userId, username } = response.data;
        SetUserData({
          userId,
          username,
          isUserLoggedIn: true,
          dataArrived: true,
        });
      }
    } catch (error) {
      localStorage.removeItem("auth-token");
      SetUserData({
        userId: null,
        username: null,
        isUserLoggedIn: false,
        dataArrived: true,
      });
    }
  };

  const userObject = {
    userData,
    authenticateUser,
  };

  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <UserContext.Provider value={userObject}>
      {userData.dataArrived ? (
        <>
          {userData.isUserLoggedIn ? <NavigationMenu /> : null}
          <Switch>
            <AuthRoute exact path="/auth" />

            <PrivateRoute exact path="/inventory" component={<Inventory />} />
            <PrivateRoute exact path="/history" component={<History />} />

            <Route path="/" render={() => <Redirect exact to="/auth" />} />
          </Switch>
        </>
      ) : (
        "Loading"
      )}
    </UserContext.Provider>
  );
}
