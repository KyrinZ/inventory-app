import { Redirect, BrowserRouter as Router } from "react-router-dom";

// Components
import InventoryPage from "./InventoryPage";
import AuthenticationPage from "./AuthenticationPage";

const userData = {
  userId: 2,
  username: "TestUser",
  isUserLoggedIn: true,
};

export default function EntryPoint() {
  return (
    <>{userData.isUserLoggedIn ? <InventoryPage /> : <AuthenticationPage />}</>
  );
}
