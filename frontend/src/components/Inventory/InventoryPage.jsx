import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Inventory from "./InventoryList/Inventory";
import History from "./HistoryList/History";
import NavigationMenu from "./NavigationBar/NavigationMenu";

// Styles
import styles from "./InventoryPage.module.scss";

export default function InventoryPage({ logOut }) {
  return (
    <Router>
      <NavigationMenu logOut={logOut} />
      <div className={styles.container}>
        <Switch>
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/history" component={History} />
        </Switch>
      </div>
    </Router>
  );
}
