import styles from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <div>
      <div id={styles.loginContainer}>
        <div className={styles.loginRow}>
          <span className={styles.loginText}>Log In</span>
          <input
            type="text"
            name="username"
            placeholder="username"
            className={styles.field}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
