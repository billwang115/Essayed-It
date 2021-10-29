import styles from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <div>
      <div id={styles.loginContainer}>
        <div className={styles.loginRow}>
          <span className={styles.loginText}>Login</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
