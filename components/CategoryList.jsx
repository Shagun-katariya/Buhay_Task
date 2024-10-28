import React, { useCallback } from "react";
import Category from "./Category.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./CategoryList.module.css";

function CategoryList({ categories = [], setCategories }) {
  //updating the category name
  const updateCategoryName = useCallback(
    (id, name) => {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id ? { ...category, name } : category
        )
      );
    },
    [setCategories]
  );

  //removing the category
  const removeCategory = useCallback(
    (id) => {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
      toast.success("Category Removed!");
    },
    [setCategories]
  );

  //adding requirement
  const addRequirement = useCallback(
    (categoryId, requirementName) => {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                requirements: [
                  ...category.requirements,
                  { id: Date.now(), name: requirementName },
                ],
              }
            : category
        )
      );
      toast.success("Requirement Added!");
    },
    [setCategories]
  );

  //removing requirement
  const removeRequirement = useCallback(
    (categoryId, requirementId) => {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                requirements: category.requirements.filter(
                  (req) => req.id !== requirementId
                ),
              }
            : category
        )
      );
      toast.success("Requirement Deleted!");
    },
    [setCategories]
  );

  return (
    <div className={styles.category__list}>
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          updateCategoryName={updateCategoryName}
          removeCategory={removeCategory}
          addRequirement={addRequirement}
          removeRequirement={removeRequirement}
        />
      ))}
    </div>
  );
}

export default React.memo(CategoryList);
