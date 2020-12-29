// Component
import MenuItem from "./MenuItem";

// Styles
import styles from "./NavigationMenu.module.scss";

import inventoryIcon from "../assets/inventory-icon.svg";
import historyIcon from "../assets/history-icon.svg";
import logoutIcon from "../assets/logout-icon.svg";

export default function NavigationMenu() {
  return (
    <nav className={styles.nav}>
      <div>
        <MenuItem image={inventoryIcon} alt="inventoryIcon">
          Inventory
        </MenuItem>
        <MenuItem image={historyIcon} alt="historyIcon">
          History
        </MenuItem>
      </div>

      <div className={styles.logout}>
        <p>Logout</p>
        <img src={logoutIcon} alt="logoutIcon" />
      </div>
    </nav>
  );
}
