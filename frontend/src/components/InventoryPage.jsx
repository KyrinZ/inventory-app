import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Inventory from "./Inventory";
import History from "./History";
import NavigationMenu from "./NavigationMenu";

// Styles
import styles from "./InventoryPage.module.scss";

export default function InventoryPage() {
  return (
    <Router>
      <NavigationMenu />
      <div className={styles.container}>
        <Switch>
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/history" component={History} />
        </Switch>
      </div>
    </Router>
  );
}
