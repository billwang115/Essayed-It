import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const Header = () => {
  const navigate = useNavigate();
  const { setCurrentUser, setUserType } = useContext(AuthContext);

  const handleLogout = () => {
    setCurrentUser(null);
    setUserType("");
    navigate("/");
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <NavLink
          to="/reviewEssays"
          className={({ isActive }) =>
            `${styles.styledNav} ${isActive && styles.currentNav}`
          }
        >
          <span className={styles.navli}>DashBoard</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${styles.styledNav} ${isActive && styles.currentNav}`
          }
        >
          <span className={styles.navli}>Profile</span>
        </NavLink>

        <NavLink
          to="/Request"
          className={({ isActive }) =>
            `${styles.styledNav} ${isActive && styles.currentNav}`
          }
        >
          <span className={styles.navli}>Request Review</span>
        </NavLink>

        <NavLink
          to="/yourRequests"
          className={({ isActive }) =>
            `${styles.styledNav} ${isActive && styles.currentNav}`
          }
        >
          <span className={styles.navli}>Your Requests</span>
        </NavLink>

        <button className={styles.signOutButton} onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Header;
