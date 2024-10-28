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
                  //for nested subrequirements
                  //const newRequirement = { id: Date.now(), name: requirementName, subRequirements: [] };
                ],
              }
            : category
        )
      );
      toast.success("Requirement Added!");
    },
    [setCategories]
  );

  //for nested requirements
  // const addRequirement = useCallback(
  //   (categoryId, requirementName, parentRequirementId = null) => {
  //     setCategories((prevCategories) =>
  //       prevCategories.map((category) => {
  //         if (category.id !== categoryId) return category;
  
  //         const addNestedRequirement = (requirements) =>
  //           requirements.map((req) =>
  //             req.id === parentRequirementId
  //               ? {
  //                   ...req,
  //                   subRequirements: [
  //                     ...req.subRequirements,
  //                     { id: Date.now(), name: requirementName, subRequirements: [] },
  //                   ],
  //                 }
  //               : { ...req, subRequirements: addNestedRequirement(req.subRequirements) }
  //           );
  
  //         return {
  //           ...category,
  //           requirements: parentRequirementId
  //             ? addNestedRequirement(category.requirements)
  //             : [...category.requirements, { id: Date.now(), name: requirementName, subRequirements: [] }],
  //         };
  //       })
  //     );
  //     toast.success("Requirement Added!");
  //   },
  //   [setCategories]
  // );
  

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

  //remove nested requirement
  // const removeRequirement = useCallback(
  //   (categoryId, requirementId) => {
  //     const removeNestedRequirement = (requirements) =>
  //       requirements
  //         .filter((req) => req.id !== requirementId)
  //         .map((req) => ({
  //           ...req,
  //           subRequirements: removeNestedRequirement(req.subRequirements),
  //         }));
  
  //     setCategories((prevCategories) =>
  //       prevCategories.map((category) =>
  //         category.id === categoryId
  //           ? {
  //               ...category,
  //               requirements: removeNestedRequirement(category.requirements),
  //             }
  //           : category
  //       )
  //     );
  //     toast.success("Requirement Deleted!");
  //   },
  //   [setCategories]
  // );
  

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
