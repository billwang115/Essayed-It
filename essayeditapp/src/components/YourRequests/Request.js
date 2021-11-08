import styles from "./Request.module.css";
import creditIcon from "../../assets/credit_icon.svg";

const Request = ({ essay }) => {
  return (
    <div className={styles.essayRequestContainer} onClick={() => window.open("/viewRequest/" + essay.requestID, "_self")}>
      <div className={styles.essayRequest}>
        <div className={styles.essayInfoContainer}>
          <div className={styles.essayTitle}>{essay.title}</div>
          <div className={styles.essayInfoRow}>
            <span className={styles.essayInfoText}>
              <b>Topic:</b> {essay.topic}
            </span>
            <span className={styles.essayInfoText}>
              <b>Type:</b> {essay.type}
            </span>
            <span className={styles.essayInfoText}>
              <b>Word Count:</b> {essay.numWords}
            </span>
            <span className={styles.essayInfoText}>
              <b>Status:</b> {essay.status}
            </span>
          </div>

          <div className={styles.essayInfoRow}>
            <span className={styles.essayAuthor}>
              <b>By:</b> {essay.author}
            </span>
            <div className={styles.essayCredits}>
              <img
                src={creditIcon}
                alt="diamond-icon"
                className={styles.essayCreditsIcon}
              />
              <span className={styles.essayCreditsText}>
                Spent {essay.numCredits} Credits
              </span>
            </div>
          </div>
        </div>

        <div className={styles.essayDescriptionContainer}>
          <div className={styles.essayDescription}>{essay.description}</div>
        </div>
      </div>

    </div>
  );
};

export default Request;
