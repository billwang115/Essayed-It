import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import WelcomePage from "../components/WelcomePage/WelcomePage";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import YourRequestsPage from "../components/YourRequests/YourRequests";
import ReviewRequest from "../components/ReviewRequest/ReviewRequest";
import EditPage from "../components/EditPage/EditPage";

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
