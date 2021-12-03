import DefaultProfileImage from "../../assets/default_profile.png";
import styles from "./ProfilePage.module.css";
import CreditIcon from "../../assets/credit_icon.svg";
import { useState, useContext } from "react";
import searchIcon from "../../assets/searchIcon.png";
import { AuthContext } from "../../contexts/AuthProvider";

const subjects = [
  "Culinary Arts",
  "Painting",
  "Computer Science",
  "Math",
  "Canadian Literature",
  "Cinema",
  "Indigenous Studies",
];

const ProfilePage = () => {
  const { userType } = useContext(AuthContext);

  const [username, setUsername] = useState("Kailas_Moon2000");
  const [usernameField, setUsernameField] = useState("");

  const [topic, setTopic] = useState("Indigenous Studies");
  const [topicField, setTopicField] = useState("");

  const [profileImageURL, setProfileImageURL] = useState(DefaultProfileImage);
  const [profileImageField, setProfileImageField] = useState("");

  const ban = () => {};
  const submit = () => {
    if (usernameField) {
      setUsername(usernameField);
    }
    if (topicField) {
      setTopic(topicField);
    }
    if (profileImageField) {
      setProfileImageURL(profileImageField);
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

  const [searchInput, setSearchInput] = useState("");
  const [credits, setCredits] = useState(18);

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
            <td>10</td>
          </tr>
          <tr>
            <td>Total Requests</td>
            <td>18</td>
          </tr>
          <tr>
            <td>Total credits earned</td>
            <td>87</td>
          </tr>
          <tr>
            <td>Average cost per review</td>
            <td>8</td>
          </tr>
          <tr>
            <td>Average score from reviewers</td>
            <td>4.6</td>
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
      )}
    </div>
  );
};

export default ProfilePage;
