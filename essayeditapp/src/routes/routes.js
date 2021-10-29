import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import WelcomePage from "../../src/components/WelcomePage/WelcomePage";
import ReviewRequest from "../../src/components/ReviewRequest/ReviewRequest";
import EditPage from "../../src/components/EditPage/EditPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <WelcomePage />
        </Route>
        <Route exact path="/Request">
          <Header />
          <ReviewRequest />
        </Route>
        <Route exact path="/Editor">
          <Header />
          <EditPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
