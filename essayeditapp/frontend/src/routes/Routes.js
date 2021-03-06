import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Header from "../components/Header/Header";
import WelcomePage from "../components/WelcomePage/WelcomePage";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import YourRequestsPage from "../components/YourRequests/YourRequests";
import ReviewRequest from "../components/ReviewRequest/ReviewRequest";
import EditPage from "../components/EditPage/EditPage";
import ReviewEssaysPage from "../components/ReviewEssaysPage/ReviewEssaysPage";
import ViewEdits from "../../src/components/EditsViewer/ViewEdits";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />

        <Route
          path="/viewRequest/:id"
          element={
            <PrivateRoute>
              <Header />
              <ViewEdits />
            </PrivateRoute>
          }
        />

        <Route
          path="reviewEssays"
          element={
            <PrivateRoute>
              <Header />
              <ReviewEssaysPage />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Header />
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="yourRequests"
          element={
            <PrivateRoute>
              <Header />
              <YourRequestsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="Request"
          element={
            <PrivateRoute>
              <Header />
              <ReviewRequest />
            </PrivateRoute>
          }
        />
        <Route
          path="Editor"
          element={
            <PrivateRoute>
              <Header />
              <EditPage />
            </PrivateRoute>
          }
        />

        {/* 404 if URL isn't expected. */}
        <Route path="*" element={<div>404 Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
