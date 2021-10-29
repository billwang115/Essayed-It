import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import WelcomePage from "../components/WelcomePage/WelcomePage";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import YourRequestsPage from "../components/YourRequests/YourRequests";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <WelcomePage />
        </Route>

        <Route exact path="/profile">
          <Header />
          <ProfilePage />
        </Route>

        <Route exact path="/yourRequests">
          <Header />
          <YourRequestsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
