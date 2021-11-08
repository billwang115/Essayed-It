import styles from "./ReviewEssaysPage.module.css";
import creditIcon from "../../assets/credit_icon.svg";

const EssayRequest = ({ essay, isAdmin, removeRequest }) => {
  return (
    <div className={styles.essayRequestContainer}>
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
                + {essay.numCredits} Credits
              </span>
            </div>
          </div>
        </div>

        <div className={styles.essayDescriptionContainer}>
          <div className={styles.essayDescription}>{essay.description}</div>
        </div>
      </div>

      <div className={styles.essayOptionsContainer}>
        <button className={styles.selectEssayButton}>Select Essay</button>
        {isAdmin && (
          <button
            className={styles.removeEssayButton}
            onClick={() => removeRequest(essay.id)}
          >
            Delete Request
          </button>
        )}
      </div>
    </div>
  );
};

export default EssayRequest;
