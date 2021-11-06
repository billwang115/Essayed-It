import styles from "./ReviewEssaysPage.module.css";
import creditIcon from "../../assets/credit_icon.svg";

const numCredits = 15; //this value will be retrieved from a server call

const ReviewEssaysPage = () => {
  return (
    <div className={styles.ReviewEssaysContainer}>
      <div className={styles.totalCreditsContainer}>
        <img src={creditIcon} alt="credit-icon" className={styles.creditIcon} />
        <span className={styles.creditText}>{numCredits} Credits</span>
      </div>

      <div className={styles.searchBarContainer}>
        <input
          type="text"
          placeholder="Search Essays"
          className={styles.searchBar}
        />
      </div>
    </div>
  );
};

export default ReviewEssaysPage;
