import styles from "./ReviewEssaysPage.module.css";
import creditIcon from "../../assets/credit_icon.svg";
import EssayRequest from "./EssayRequest";

const numCredits = 15; //this value will be retrieved from a server call
const currentUserRating = 4; //this value will be retrieved from a server call
const sampleEssays = [
  // this information will be retrived from a server call
  // only the essays that have the number of credits, less than or equal to their current user rating will be given by the server
  {
    title: "Facebook for the better or worse?",
    description:
      "Social Media is one aspect of technology that has taken the world by storm. Is one the of the most influential social networks, Facebook, hurting us? Should we be worried by the lack of privacy and face to face interaction?",
    topic: "Technology",
    type: "Argumentative",
    numWords: 1400,
    author: "Kailas Moon",
    numCredits: 4,
  },
  {
    title: "Twitter as Political Platform",
    description:
      "With the amount of campaigning done on social networks nowadays, it has become a concern whether action should be taken against political misuse. There has been debates whether Twitter be responsible to take down accounts for violating human rights.",
    topic: "Technology",
    type: "Expository",
    numWords: 1000,
    author: "William Wang",
    numCredits: 4,
  },
  {
    title: "Dangers of Facial Recognition",
    description:
      "Being an avid user of Social Media, I've had some scary experiences using their facial recognition technology. I describe all of the horrors of this new technology in my essay.",
    topic: "Technology",
    type: "Descriptive",
    numWords: 2000,
    author: "Ethan Moran",
    numCredits: 3,
  },
];

const ReviewEssaysPage = () => {
  const requests = sampleEssays.map((item) => <EssayRequest essay={item} />);

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

      <div>
        <h2 className={styles.cateredHeader}>Catered for You</h2>
        <div className={styles.ratingAndButton}>
          <span className={styles.ratingText}>
            Your Rating: {currentUserRating}
          </span>
          <button className={styles.topicButton}>
            Change Preferred Topics
          </button>
        </div>
        <div className={styles.essayRequestList}>{requests}</div>
      </div>
    </div>
  );
};

export default ReviewEssaysPage;
