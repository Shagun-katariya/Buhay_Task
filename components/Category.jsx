import React, { useState, useCallback, useEffect } from "react";
import Requirement from "./Requirement.jsx";
import { toast } from "react-toastify";
import styles from "./Category.module.css";

function Category({
  category = [],
  updateCategoryName,
  removeCategory,
  addRequirement,
  removeRequirement,
}) {
  const [requirementName, setRequirementName] = useState("");

  //dynamically import the CSS file
  useEffect(() => {
    import("react-toastify/dist/ReactToastify.css");
  }, []);

  //update accordingly with nested requirements
  const handleAddRequirement = useCallback(() => {
    const trimmedRequirement = requirementName.trim();
    const trimmedCategoryName = category.name.trim();
    // Check if category name is valid
    if (!trimmedCategoryName) {
      toast.error(
        "Please enter a valid category name before adding requirements!"
      );
      return;
    }

    if (trimmedRequirement) {
      addRequirement(category.id, trimmedRequirement);
      setRequirementName("");
    } else {
      toast.error("Requirement cannot be null or empty!");
    }
  }, [requirementName, addRequirement, category]);

  return (
    <div className={styles.category}>
      <div className={styles.category__header}>
        <input
          type="text"
          value={category.name}
          onChange={(e) => updateCategoryName(category.id, e.target.value)}
          placeholder="Category Name"
        />
        <button onClick={() => removeCategory(category.id)}>Delete</button>
      </div>
      <div className={styles.category__body}>
        {category.requirements.map((requirement) => (
          <Requirement
            key={requirement.id}
            requirement={requirement}
            removeRequirement={() =>
              removeRequirement(category.id, requirement.id)
            }
          />
        ))}
        <div className={styles.requirement__add}>
          <input
            type="text"
            value={requirementName}
            onChange={(e) => setRequirementName(e.target.value)}
            placeholder="Add Requirement"
          />
          <button onClick={handleAddRequirement}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Category);
