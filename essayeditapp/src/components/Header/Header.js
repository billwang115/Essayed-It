import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <NavLink to="/" className={styles.styledNav}>
          <span className={styles.navli}>DashBoard</span>
        </NavLink>

        <NavLink to="/profile" className={styles.styledNav}>
          <span className={styles.navli}>Profile</span>
        </NavLink>

        <NavLink to="/" className={styles.styledNav}>
          <span className={styles.navli}>Request Review</span>
        </NavLink>

        <NavLink to="/yourRequests" className={styles.styledNav}>
          <span className={styles.navli}>Your Requests</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
