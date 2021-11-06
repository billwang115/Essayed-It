import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import WelcomePage from "../components/WelcomePage/WelcomePage";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import YourRequestsPage from "../components/YourRequests/YourRequests";
import ReviewRequest from "../components/ReviewRequest/ReviewRequest";
import EditPage from "../components/EditPage/EditPage";
import ReviewEssaysPage from "../components/ReviewEssaysPage/ReviewEssaysPage";
import RequestDetailPage from "../components/RequestDetailPage/RequestDetailPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />

        <Route path="/viewRequest/:id" element={<RequestDetailPage />} />

        <Route
          path="reviewEssays"
          element={
            <>
              <Header />
              <ReviewEssaysPage />
            </>
          }
        />

        <Route
          path="profile"
          element={
            <>
              <Header />
              <ProfilePage />
            </>
          }
        />

        <Route
          path="yourRequests"
          element={
            <>
              <Header />
              <YourRequestsPage />
            </>
          }
        />

        <Route
          path="Request"
          element={
            <>
              <Header />
              <ReviewRequest />
            </>
          }
        />

        <Route
          path="Editor"
          element={
            <>
              <Header />
              <EditPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
