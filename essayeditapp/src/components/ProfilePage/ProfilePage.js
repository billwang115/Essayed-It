import DefaultProfileImage from "../../assets/default_profile.png";
import styles from "./ProfilePage.module.css";
import CreditIcon from "../../assets/credit_icon.svg";

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
  return (
    <>
      <div id={styles.profileImageContainer}>
        <img id={styles.profileImage} src={DefaultProfileImage} />
      </div>

      <div id={styles.userInfoContainer}>
        <span id={styles.username}>Kailas_Moon2000</span>
        <br />
        <img id={styles.creditIcon} src={CreditIcon} />
        <span className={styles.subheading}>15 CREDITS</span>
      </div>

      <div id={styles.subjectsContainer}>
        {subjects.map((subject, i) => (
          <button disabled className={styles.subject} key={i}>
            {subject}
          </button>
        ))}
      </div>

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
    </>
  );
};

export default ProfilePage;
