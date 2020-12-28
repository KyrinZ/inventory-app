import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inventory from "./Inventory";
import History from "./History";
import NavigationMenu from "./NavigationMenu";

export default function InventoryPage() {
  return (
    <Router>
      <NavigationMenu />
      <Switch>
        <Route exact path="/inventory" component={Inventory} />
        <Route exact path="/history" component={History} />
      </Switch>
    </Router>
  );
}
