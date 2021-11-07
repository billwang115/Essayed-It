import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState("");

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, userType, setUserType }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
