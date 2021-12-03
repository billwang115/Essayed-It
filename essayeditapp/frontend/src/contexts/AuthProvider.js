import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // will be stored in local storage in phase 2
  const [userType, setUserType] = useState(""); // will be stored in local storage in phase 2

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, userType, setUserType }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
