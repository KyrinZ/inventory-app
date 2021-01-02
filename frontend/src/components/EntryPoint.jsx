import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import InventoryPage from "./Inventory/InventoryPage";
import AuthenticationPage from "./Authentication/AuthenticationPage";

// Utilities
import { axios } from "./utilities";

export default function EntryPoint() {
  const [userData, setUserData] = useState({
    userId: 2,
    username: "TestUser",
    isUserLoggedIn: false,
  });

  const logIn = () => {
    setUserData({
      userId: 2,
      username: "TestUser",
      isUserLoggedIn: true,
    });
  };
  const logOut = () => {
    localStorage.removeItem("auth-token");
    setUserData({
      userId: 2,
      username: "TestUser",
      isUserLoggedIn: false,
    });
  };

  useEffect(() => {
    axios.defaults.headers["auth-token"] = null;
    const token = localStorage.getItem("auth-token");
    if (token) {
      setUserData({
        userId: 2,
        username: "TestUser",
        isUserLoggedIn: true,
      });
    } else {
      setUserData({
        userId: 2,
        username: "TestUser",
        isUserLoggedIn: false,
      });
    }
  }, [setUserData]);

  return (
    <Router>
      {userData.isUserLoggedIn ? (
        <InventoryPage logOut={logOut} />
      ) : (
        <AuthenticationPage logIn={logIn} />
      )}
    </Router>
  );
}
