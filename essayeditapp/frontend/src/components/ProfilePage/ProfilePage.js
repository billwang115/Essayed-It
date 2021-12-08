import DefaultProfileImage from "../../assets/default_profile.png";
import styles from "./ProfilePage.module.css";
import CreditIcon from "../../assets/credit_icon.svg";
import { useState, useEffect, useContext } from "react";
import searchIcon from "../../assets/searchIcon.png";
import { AuthContext } from "../../contexts/AuthProvider";


import ENV from "../../config.js";
const API_HOST = ENV.api_host;

const subjects = [
  "Culinary Arts",
  "Painting",
  "Computer Science",
  "Math",
  "Canadian Literature",
  "Cinema",
  "Indigenous Studies",
];

//This information will be pulled from the backend
let sampleUsers = [
  { userID: "123456", username: "kailas" },
  { userID: "123457", username: "ethan" },
  { userID: "123458", username: "billiam" },
];

const ProfilePage = () => {
  const { userType, currentUser } = useContext(AuthContext);

  const [username, setUsername] = useState();
  const [usernameField, setUsernameField] = useState("");

  const [allUsers, setAllUsers] = useState(sampleUsers);

  const [topic, setTopic] = useState();
  const [topicField, setTopicField] = useState("");

  const [profileImageURL, setProfileImageURL] = useState(DefaultProfileImage);
  const [profileImageField, setProfileImageField] = useState("");

  const [newUsernames, setNewUsernames] = useState(["", "", ""]);
  const [member, setMember] = useState(null)



  function profileDataSetup(){
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

            setUsername(user.username)
            setTopic(user.topics[0])
            setCredits(user.credits)
            setScore(user.score)
        })
        .catch(error => {
            console.log(error);
        });


  }

  useEffect(() => {
    profileDataSetup()
  }, []);

  const adminSetUsername = (index) => {
    let newAllUsers = [...allUsers];
    newAllUsers[index].username = newUsernames[index];
    setAllUsers(newAllUsers);
  };

  const deleteUser = (index) => {
    let newAllUsers = [...allUsers];
    newAllUsers.splice(index, 1);
    setAllUsers(newAllUsers);
  };
  const ban = () => {};
  const submit = async () => {
    if (usernameField) {
      setUsername(usernameField);
    }
    if (topicField) {
      await setTopicBackend(topicField);
    }
    if (profileImageField) {
      setProfileImageURL(profileImageField);
    }
  };

  const setTopicBackend = async (topic) => {
    const request = new Request(`${API_HOST}/api/users/${currentUser}/topics`, {
      method: "post",
      body: JSON.stringify({ topics: [topic] }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    try {
      const res = await fetch(request);
      if (res.status === 200) {
        const json = await res.json();
        if (json !== undefined) {
          setTopic(topic);
        }
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleSubmit = () => {};
  const handleEnter = () => {};
  const award = () => {
    setCredits(credits + 1);
  };
  const deduct = () => {
    setCredits(credits - 1);
  };
  const handleNewUsernameChange = (index, newUsername) => {
    let newNewUsernames = [...newUsernames];
    newNewUsernames[index] = newUsername;
    setNewUsernames(newNewUsernames);
  };

  const [searchInput, setSearchInput] = useState("");
  const [credits, setCredits] = useState();
  const [score, setScore] = useState(0);
  return (
    <div id={styles.root}>
      <div id={styles.profileImageContainer}>
        <img id={styles.profileImage} src={profileImageURL} />
      </div>

      {/*Info & statistics below will be fetched from our backend.*/}
      <div id={styles.userInfoContainer}>
        <span id={styles.username}>{username}</span>

        {userType === "admin" && (
          <>
            <button id={styles.banUserButton} onClick={ban}>
              REMOVE USER
            </button>

            <button id={styles.banUserButton} onClick={award}>
              Award credits
            </button>

            <button id={styles.banUserButton} onClick={deduct}>
              Deduct credits
            </button>
          </>
        )}
        <br />
        <img id={styles.creditIcon} src={CreditIcon} />
        <span className={styles.subheading}>{credits} CREDITS</span>
      </div>

      <div id={styles.subjectsContainer}>
        <button disabled className={styles.subject}>
          {topic}
        </button>
      </div>

      {/*The values below will be fetched from our backend.*/}
      <div id={styles.statsContainer}>
        <span className={styles.header}>STATISTICS</span>
        <table id={styles.statsTable}>
          <tr>
            <td>Reviews completed</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Total Requests</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Total credits earned</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Average cost per review</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Average score from reviewers</td>
            <td>{score}</td>
          </tr>
        </table>
      </div>

      <div id={styles.editProfileContainer}>
        <span className={styles.header}>Edit Profile:</span>

        <form id={styles.editForm}>
          <label for="fname">Username:</label>
          <input
            onChange={(e) => {
              setUsernameField(e.target.value);
            }}
            value={usernameField}
            className={styles.field}
            type="text"
          />
          <br />
          <label for="lname">Profile Image URL:</label>
          <input
            onChange={(e) => {
              setProfileImageField(e.target.value);
            }}
            value={profileImageField}
            className={styles.field}
            type="text"
          />
          <br />
          <label for="lname">Topic of interest:</label>
          <input
            onChange={(e) => {
              setTopicField(e.target.value);
            }}
            value={topicField}
            className={styles.field}
            type="text"
          />
        </form>

        <button id={styles.submitButton} onClick={submit}>
          Submit
        </button>
      </div>

      {userType === "admin" && (
        <>
          <div id={styles.searchForUser}>
            <span className={styles.header}>Search for a user</span>

            <div className={styles.searchBarContainer}>
              <input
                type="text"
                placeholder="Search Users"
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
          </div>

          {allUsers
            .filter((e) => e.username.includes(searchInput))
            .map((e, i) => (
              <div key={i} className={styles.userContainer}>
                <h4>{e.username}</h4>
                User ID: {e.userID}
                <br />
                <button
                  onClick={() => deleteUser(i)}
                  className={styles.deleteUser}
                >
                  DELETE USER
                </button>
                <br />
                <input
                  type="text"
                  value={newUsernames[i]}
                  onChange={(e) => handleNewUsernameChange(i, e.target.value)}
                ></input>
                <button
                  onClick={() => adminSetUsername(i)}
                  className={styles.changeUsernameButton}
                >
                  CHANGE USERNAME
                </button>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
