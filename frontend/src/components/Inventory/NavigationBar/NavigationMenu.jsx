import { useContext } from "react";
import { useHistory } from "react-router-dom";

// Component
import MenuItem from "./MenuItem";

// Styles
import styles from "./styles/NavigationMenu.module.scss";

// Utilities
import { historyIcon, inventoryIcon, logoutIcon } from "../../../assets/";
import { UserContext } from "../../EntryPoint";

export default function NavigationMenu() {
  const userObject = useContext(UserContext);

  const logOut = () => {
    localStorage.removeItem("auth-token");
    userObject.authenticateUser();
  };

  return (
    <nav className={styles.nav}>
      <div>
        <MenuItem path="/inventory" image={inventoryIcon} alt="inventoryIcon">
          Inventory
        </MenuItem>
        <MenuItem path="/history" image={historyIcon} alt="historyIcon">
          History
        </MenuItem>
      </div>

      <div
        onClick={() => {
          logOut();
        }}
        className={styles.logout}
      >
        <p>Logout</p>
        <img src={logoutIcon} alt="logoutIcon" />
      </div>
    </nav>
  );
}
