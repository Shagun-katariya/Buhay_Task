import React from "react";
import styles from "./Landing.module.css";

const Landing = ({ show }) => {
  return (
    <div
      className={`${styles.landing} ${show ? styles.visible : styles.hidden}`}
    >
      <div className={styles.landing__content}>
        <h1 className={styles.title}>Welcome to Buhay!</h1>
        <p className={styles.tagline}>Add your categories!</p>
        <p className={styles.description}>
          Buhay is your gateway to a vibrant community. Join us to share your
          experiences, connect with others, and make a difference.
        </p>
      </div>
    </div>
  );
};

export default React.memo(Landing);
