import { createContext, useState, useEffect } from "react";
import ENV from "../constants/config";

export const AuthContext = createContext();
const API_HOST = ENV.api_host;

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // will be stored in local storage in phase 2
  const [userType, setUserType] = useState(""); // will be stored in local storage in phase 2
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    const url = `${API_HOST}/users/check-session`;

    try {
      const res = await fetch(url);
      if (res.status === 200) {
        const json = await res.json();
        if (json && json.currentUser) {
          setCurrentUser(json.currentUser);
          setUserType(json.isAdmin ? "admin" : "user");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (credentials) => {
    const request = new Request(`${API_HOST}/users/login`, {
      method: "post",
      body: JSON.stringify(credentials),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    try {
      const res = await fetch(request);
      if (res.status === 200) {
        const json = await res.json();
        if (json.currentUser !== undefined) {
          setCurrentUser(json.currentUser);
          setUserType(json.isAdmin ? "admin" : "user");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    const url = `${API_HOST}/users/logout`;

    try {
      const res = await fetch(url);
      setCurrentUser(null);
      setUserType("");
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (credentials) => {
    const request = new Request(`${API_HOST}/api/users`, {
      method: "post",
      body: JSON.stringify(credentials),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    try {
      const res = await fetch(request);
      if (res.status === 200) {
        const json = await res.json();
        if (json.currentUser !== undefined) {
          setCurrentUser(json.currentUser);
          setUserType(json.isAdmin ? "admin" : "user");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await checkSession();
      setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, userType, login, logout, register }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
