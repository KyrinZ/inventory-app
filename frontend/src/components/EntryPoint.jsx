import InventoryPage from "./InventoryPage";
import AuthenticationPage from "./AuthenticationPage";

const userData = {
  userId: 2,
  username: "TestUser",
  isUserLoggedIn: false,
};

export default function EntryPoint() {
  return (
    <div>
      {userData.isUserLoggedIn ? <InventoryPage /> : <AuthenticationPage />}
    </div>
  );
}
