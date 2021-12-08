import styles from "./ReviewEssaysPage.module.css";
import creditIcon from "../../assets/credit_icon.svg";
import searchIcon from "../../assets/searchIcon.png";
import EssayRequest from "./EssayRequest";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router";
import ENV from '../../config.js'
const API_HOST = ENV.api_host



let sampleCateredEssays = [
  // this information will be retrived from a server call. Only a select number of them will be given by the server (to reduce lag and since only a few are needed)
  // these essays are catered to the current users favourite topic
  // only the essays that have the number of credits, less than or equal to their current user rating will be given by the server
  {
    id: "5d1ff7c6-f1f2-44f5-8640-b1265dedd257",
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
    id: "248c4525-c026-4cc2-bf24-b122c95a9a38",
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
    id: "97969781-8462-4fe6-8fd7-0c169d5e31f5",
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

let sampleAllTopicsEssays = [
  // this information will be retrived from a server call. Only a select number of them will be given by the server at a time
  // these essays are not catered to a certain topic
  {
    id: "ec0602bd-6c6b-4ab9-a2ca-b2a65fef0232",
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
    id: "f758dbc0-bec5-44ee-8f0b-54fb95ef8125",
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
    id: "cd9de47d-c967-4e72-b706-2747d89616ab",
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
    id: "92a5e87e-9828-4e21-a4d3-10f267b531b4",
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
  const[numCredits, setNumCredits] = useState(0); //this value will be retrieved from a server call
  const[currentUserRating, setCurrentUserRating] = useState(0);  //this value will be retrieved from a server call
  const[member, setMember] = useState(null)

  useEffect(() => {
    getAllEssays()
    getUserScoreandCredits()
  }, []);

  const { userType } = useContext(AuthContext);
  const {currentUser} = useContext(AuthContext);



  function getUserScoreandCredits(){
    const url = `${API_HOST}/api/users/${currentUser}`;
    console.log(url)
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get User");
            }
        })
        .then(user => {
            setCurrentUserRating(user.score)
            setNumCredits(user.credits)
            setMember(user)
        })
        .catch(error => {
            console.log(error);
        });
  }

  function getAllEssays(){
    const url = `${API_HOST}/api/essays`;
    console.log(url)
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get all essays");
            }
        })
        .then(json => {
            const allEssaysJson = json;
            console.log(allEssaysJson)
            removeMyEssays(allEssaysJson)
        })
        .catch(error => {
            console.log(error);
        });
  }


  function removeMyEssays(essaysJson){
    //Also removes essays that have already been completed
    const displayList = []
    const displayListCurated = []
    for(let i = 0; i < essaysJson.length; i++) {
      console.log(essaysJson[i].status)
    if(essaysJson[i].author != currentUser && essaysJson[i].status == "PENDING"){
      displayList.push(essaysJson[i])
      if(member.topics.includes(essaysJson[i].topic)) {
        displayListCurated.push(essaysJson[i])
      }
    }
  }
  setAllCopy(displayList)
  setCateredCopy(displayListCurated)
}
  const removeRequest = (requestID) => {
    // a server call will be done first to remove the request from the server
    //then dom will be manipulated
    if (cateredCopy.some((request) => request.id === requestID)) {
      const newArray = cateredCopy.filter(
        (request) => request.id !== requestID
      );
      setCateredCopy(newArray);
      sampleCateredEssays = newArray; //done in the server
    } else {
      const newArray = allCopy.filter((request) => request.id !== requestID);
      setAllCopy(newArray);
      sampleAllTopicsEssays = newArray;
    }
  };

  const cateredRequests = cateredCopy.map((item) => (
    <EssayRequest
      essay={item}
      key={item.id}
      isAdmin={userType === "admin"}
      removeRequest={removeRequest}
    />
  ));

  const allRequests = allCopy.map((item) => (
    <EssayRequest
      essay={item}
      key={item.id}
      isAdmin={userType === "admin"}
      removeRequest={removeRequest}
    />
  ));

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

  const Navigate = useNavigate();

  return (
    <div className={styles.ReviewEssaysContainer}>
      <div className={styles.totalCreditsContainer}>
        <img src={creditIcon} alt="credit-icon" className={styles.creditIcon} />
        <span className={styles.creditText}>
          {userType !== "admin" ? numCredits : "Unlimited"} Credits
        </span>
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
            Your Rating:{" "}
            {userType !== "admin" ? currentUserRating : "No Rating"}
          </span>
          <button
            className={styles.topicButton}
            onClick={() => Navigate("/profile")}
          >
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
