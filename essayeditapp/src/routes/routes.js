import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import WelcomePage from "../../src/components/WelcomePage/WelcomePage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <WelcomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
