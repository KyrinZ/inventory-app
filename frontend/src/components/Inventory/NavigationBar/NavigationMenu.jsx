import { useHistory } from "react-router-dom";

// Component
import MenuItem from "./MenuItem";

// Styles
import styles from "./styles/NavigationMenu.module.scss";

// Utilities
import { historyIcon, inventoryIcon, logoutIcon } from "../../../assets/";

export default function NavigationMenu({ logOut }) {
  let history = useHistory();
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
          history.push("/");
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
