import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

//code was inspired by https://youtu.be/PKwu15ldZ7k?t=2462 and https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate replace to="/" />; //NOTE: DOESN'T WORK USING SERVER-SIDE RENDERING SO PLEASE REMOVE IF THAT IS THE CASE
};

export default PrivateRoute;
