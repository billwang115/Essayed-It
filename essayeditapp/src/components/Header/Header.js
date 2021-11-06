import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
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
      </div>
    </div>
  );
};

export default Header;
