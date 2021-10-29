import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import WelcomePage from "../../src/components/WelcomePage/WelcomePage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Header />
        <Route exact path="/">
          <WelcomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
