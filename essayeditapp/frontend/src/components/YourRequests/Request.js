import styles from "./Request.module.css";
import creditIcon from "../../assets/credit_icon.svg";
import { useNavigate } from "react-router-dom";

const Request = ({ essay, index, cancelRequest }) => {
  const cancel = () => {
    cancelRequest(index);
  };
  const Navigate = useNavigate();

  function checkIfCompleted() {
    if (essay.status == "COMPLETED") {
      Navigate("/viewRequest/edit", { state: { essayID: essay._id } });
    }
  }

  return (
    <div className={styles.essayRequestContainer}>
      <div className={styles.essayRequest} onClick={() => checkIfCompleted()}>
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

      {essay.status === "PENDING" && (
        <button className={styles.selectEssayButton} onClick={cancel}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default Request;
