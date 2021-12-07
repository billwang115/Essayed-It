import Request from "./Request";
import styles from "./YourRequests.module.css";
import { useState, useEffect} from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";


import ENV from '../../config.js'
const API_HOST = ENV.api_host

const EssayPlaceholder =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique eget mauris et bibendum. Nullam ut mollis nunc, sit amet interdum mi. Donec faucibus magna vel ipsum volutpat dapibus eleifend interdum diam. Praesent posuere erat elit, vitae congue diam tempor at. Aliquam dictum, dolor vel placerat ultrices, ex neque tempus odio, vel egestas orci nunc eu ex. Curabitur eget blandit lectus. Maecenas at leo congue, bibendum leo sed, aliquet velit. Duis finibus quis risus quis aliquam. Etiam a nisi ut nibh tempus facilisis vitae non metus. Praesent ultricies nisi eu sagittis consequat. Phasellus et tortor ut augue viverra mattis sed vitae mi. Donec lobortis nunc eu purus sodales posuere. Quisque scelerisque ante arcu, sed auctor odio aliquam nec. Nam pretium quam ex. Fusce vitae bibendum metus, in maximus sem. Phasellus et lacus sed mauris semper malesuada non in ex.";

const sampleEssayRequests = [
  // this information will be retrived from a server call. Only a select number of them will be given by the server (to reduce lag and since only a few are needed)
  {
    title: "Facebook for the better or worse?",
    description:
      "Social Media is one aspect of technology that has taken the world by storm. Is one the of the most influential social networks, Facebook, hurting us? Should we be worried by the lack of privacy and face to face interaction?",
    topic: "Technology",
    type: "Argumentative",
    numWords: 1400,
    author: "Kailas Moon",
    numCredits: 4,
    essayContent: EssayPlaceholder,
    status: "PENDING",
    requestID: 0,
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
    essayContent: EssayPlaceholder,
    status: "IN REVIEW",
    requestID: 1,
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
    essayContent: EssayPlaceholder,
    status: "COMPLETED",
    requestID: 2,
  },
];


const YourRequests = () => {
  const [essayRequests, setEssayRequests] = useState([]);

  const { userType } = useContext(AuthContext);
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    getAllEssays()
  }, []);

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
            setEssayRequests(removeMyEssays(allEssaysJson))
        })
        .catch(error => {
            console.log(error);
        });
  }

  function removeMyEssays(essaysJson){
    //Also removes essays that have already been completed
    const displayList = []
    for(let i = 0; i < essaysJson.length; i++) {
      console.log(essaysJson[i].status)
    if(essaysJson[i].author == currentUser && essaysJson[i].status != "CANCELLED"){
      displayList.push(essaysJson[i])
    }
  }
  return displayList
}


  function setEssayCancelled(essay){
    const url = `${API_HOST}/api/essays/${essay._id}`;
    const json_set = { status: "CANCELLED"}
    const request = new Request(url, {
        method: "put",
        body: JSON.stringify(json_set),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                console.log("Successfully cancelled")
             }
            else {
                console.log("Failed to cancelled")

               }
        })
        .catch(error => {
            console.log(error);
        });
  }

  const cancelRequest = (index) => {
    console.log(index);
    setEssayCancelled(essayRequests[index])
    // let newRequests = [...essayRequests];
    // newRequests.splice(index, 1);
    // setEssayRequests(newRequests);
  };
  return (
    <div id={styles.container}>
      <span className={styles.header}> Your Requests: </span>
      {essayRequests.map((request, i) => (
        <Request
          key={i}
          index={i}
          essay={request}
          cancelRequest={cancelRequest}
        />
      ))}
    </div>
  );
};

export default YourRequests;
