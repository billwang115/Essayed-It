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

  const ban = () => {}
  const submit = () => {};
  const handleSubmit = () => {};
  const handleEnter = () => {};
  const award = () => {
    setCredits(credits+1);
  }
  const deduct = () => {
    setCredits(credits-1);
  }

  const [searchInput, setSearchInput] = useState("");
  const [credits, setCredits] = useState(18);

  return (
    <div id={styles.root}>
      <div id={styles.profileImageContainer}>
        <img id={styles.profileImage} src={DefaultProfileImage} />
      </div>

      {/*Info & statistics below will be fetched from our backend.*/}
      <div id={styles.userInfoContainer}>
        <span id={styles.username}>Kailas_Moon2000</span>

        {userType === "admin" && (<>
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
            Indigenous Studies
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
        </table>
      </div>

      <div id={styles.editProfileContainer}>
        <span className={styles.header}>Edit Profile:</span>

        <form id={styles.editForm}>
          <label for="fname">Username:</label>
          <input className={styles.field} type="text" id="fname" name="fname" />
          <br />
          <label for="lname">Profile Image URL:</label>
          <input className={styles.field} type="text" id="lname" name="lname" />
          <br />
          <label for="lname">Topic of interest:</label>
          <input className={styles.field} type="text" id="lname" name="lname" />
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
