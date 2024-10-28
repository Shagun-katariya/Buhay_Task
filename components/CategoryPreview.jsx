import React, { useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./CategoryPreview.module.css";

function CategoryPreview({ categories = [] }) {
  const printJSON = useCallback(() => {
    console.log(JSON.stringify(categories, null, 2));
    toast.success("Console Successfully!");
  }, [categories]);

  return (
    <div className={styles.category__preview}>
      <h2>Categories Preview</h2>
      {categories.map((category) => (
        <div key={category.id} className={styles.preview__category}>
          <strong>{category.name || "Untitled Category"}</strong>
          <ul>
            {category.requirements.map((requirement) => (
              <li key={requirement.id}>{requirement.name}</li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={printJSON}>Export</button>
    </div>
  );
}

export default React.memo(CategoryPreview);
