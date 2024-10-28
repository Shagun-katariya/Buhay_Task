import React from "react";
import styles from "./Requirement.module.css";

const Requirement = React.memo(({ requirement, removeRequirement }) => {
  return (
    <div className={styles.requirement}>
      <span>{requirement.name}</span>
      <button onClick={removeRequirement}>Delete</button>
    </div>
  );
});

export default Requirement;
