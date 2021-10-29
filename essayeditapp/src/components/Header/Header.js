import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <NavLink to="/" className={styles.styledNav}>
          <h4 classname={styles.navli}>DashBoard</h4>
        </NavLink>

        <NavLink to="/" className={styles.styledNav}>
          <h4 classname={styles.navli}>Profile</h4>
        </NavLink>

        <NavLink to="/" className={styles.styledNav}>
          <h4 classname={styles.navli}>Request Review</h4>
        </NavLink>

        <NavLink to="/" className={styles.styledNav}>
          <h4 classname={styles.navli}>View Pending</h4>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
