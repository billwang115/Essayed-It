import DefaultProfileImage from "../../assets/default_profile.png";
import styles from "./ProfilePage.module.css";
import CreditIcon from "../../assets/credit_icon.svg";

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
    </>
  );
};

export default ProfilePage;
