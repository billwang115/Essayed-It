import styles from "./ReviewEssaysPage.module.css";
import creditIcon from "../../assets/credit_icon.svg";
import searchIcon from "../../assets/searchIcon.png";
import EssayRequest from "./EssayRequest";
import { useState, useEffect } from "react";

const numCredits = 15; //this value will be retrieved from a server call
const currentUserRating = 4; //this value will be retrieved from a server call
const sampleCateredEssays = [
  // this information will be retrived from a server call. Only a select number of them will be given by the server (to reduce lag and since only a few are needed)
  // these essays are catered to the current users favourite topic
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

const sampleAllTopicsEssays = [
  // this information will be retrived from a server call. Only a select number of them will be given by the server at a time
  // these essays are not catered to a certain topic
  {
    title: "Theseus vs Hercules",
    description:
      "Hercules and Theseus are two of the most well known heroes in greek mythology. They've defeated mythical monsters and travelled to the ends of the earth. An analysis of the similiarities between these heroes are provided.",
    topic: "Greek Mythology",
    type: "Expository",
    numWords: 1200,
    author: "Lotsuv Fun",
    numCredits: 4,
  },
  {
    title: "An analysis of Stomach Cancer",
    description:
      "From the various types of cancers, stomach cancer has been one of the most common ones people get diagnosed with. In this essay, an analysis of the effects of stomach cancer on the stomach and the inheritance of the cancer is made.",
    topic: "Biology",
    type: "Expository",
    numWords: 800,
    author: "Bill Wang",
    numCredits: 3,
  },
  {
    title: "How government control can backfire",
    description:
      "In the pursuit of stability, these governments attempt to control how the citizens act and think, using unethical laws or propaganda.  However, the government’s enforcement of these ideas can instead further motivate the citizens to disregard the laws, backfiring on the government’s original intentions.",
    topic: "Society",
    type: "Argumentative",
    numWords: 1500,
    author: "Victor Chen",
    numCredits: 2,
  },
  {
    title: "The power of learning through imitation",
    description:
      "During the mid 20th century, juvenile delinquency had become very prevalent in many big american cities. Many psychologists did experiments on this topic, which will be elaborated further in the essay.",
    topic: "Psychology",
    type: "Descriptive",
    numWords: 1800,
    author: "Kavin Zhu",
    numCredits: 1,
  },
];

const ReviewEssaysPage = () => {
  const [cateredCopy, setCateredCopy] = useState([]);
  const [allCopy, setAllCopy] = useState([]);

  useEffect(() => {
    setCateredCopy(sampleCateredEssays); //essays retrieved from the server
    setAllCopy(sampleAllTopicsEssays);
  }, []);

  const cateredRequests = cateredCopy.map((item) => (
    <EssayRequest essay={item} />
  ));

  const allRequests = allCopy.map((item) => <EssayRequest essay={item} />);

  const [searchInput, setSearchInput] = useState("");
  const handleSubmit = () => {
    //the code below will all be done on the server in phase 2
    const formattedQuery = searchInput.toLowerCase();
    const newCatered = sampleCateredEssays.filter(
      (essay) =>
        essay.title.toLowerCase().includes(formattedQuery) ||
        essay.description.toLowerCase().includes(formattedQuery) ||
        essay.author.toLowerCase().includes(formattedQuery) ||
        essay.topic.toLowerCase().includes(formattedQuery)
    );

    const newAll = sampleAllTopicsEssays.filter(
      (essay) =>
        essay.title.toLowerCase().includes(formattedQuery) ||
        essay.description.toLowerCase().includes(formattedQuery) ||
        essay.author.toLowerCase().includes(formattedQuery) ||
        essay.topic.toLowerCase().includes(formattedQuery)
    );

    // this code will be done locally
    setCateredCopy(newCatered);
    setAllCopy(newAll);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

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
          value={searchInput}
          onInput={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleEnter}
        />
        <button className={styles.searchButton} onClick={handleSubmit}>
          <img
            src={searchIcon}
            alt="search-Icon"
            className={styles.searchIcon}
          />
        </button>
      </div>

      <div className={styles.cateredSection}>
        <h2 className={styles.sectionHeader}>Catered for You</h2>
        <div className={styles.ratingAndButton}>
          <span className={styles.ratingText}>
            Your Rating: {currentUserRating}
          </span>
          <button className={styles.topicButton}>
            Change Preferred Topics
          </button>
        </div>
        <div className={styles.essayRequestList}>{cateredRequests}</div>
      </div>

      <div className={styles.allTopicsSection}>
        <h2 className={styles.sectionHeader}>All Topics</h2>
        <div className={styles.essayRequestList}>{allRequests}</div>
      </div>
    </div>
  );
};

export default ReviewEssaysPage;
