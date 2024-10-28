import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import styles from "../styles/Index.module.css";
import { toast, ToastContainer } from "react-toastify";

//Client-Side Rendering Only and Code Splitting for Performance
import dynamic from "next/dynamic";
const Landing = dynamic(() => import("../components/Landing.jsx"), {
  ssr: false,
});

// from next/head we can improve SEO
//Optimizing Initial Page Load
const CategoryPreview = lazy(() => import("../components/CategoryPreview.jsx"));
const CategoryList = lazy(() => import("../components/CategoryList.jsx"));

function App() {
  const [categories, setCategories] = useState([]);
  const [showLanding, setShowLanding] = useState(true);
  // State to control visibility of Landing

  //Using useCallback for Memoization
  const addCategory = useCallback(() => {
    const hasEmptyName = categories.some((category) => !category.name.trim());

    // Display toast notification for empty category names outside of setCategories
    if (hasEmptyName) {
      toast.error(
        "Please utilize all previous categories before adding a new one!"
      );
      return;
    }

    // If no empty category names, proceed to add new category
    const newCategory = { id: Date.now(), name: "", requirements: [] };
    setCategories((prevCategories) => [...prevCategories, newCategory]);
    toast.success("Category Added!");
  }, [categories, setCategories]);

  //useEffect for updating the Landing state value
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.app}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Landing show={showLanding} />
      <div
        className={`${styles.app__content} ${
          showLanding ? styles.loading : styles.loaded
        }`}
      >
        <div className={styles.app__header}>
          <h1>Requirement Submission List</h1>
        </div>
        <div className={styles.app__body}>
          <div className={styles.app__controls}>
            <button onClick={addCategory}>Add Category</button>
          </div>
          <div className={styles.app__content1}>
            <Suspense fallback={<div>Loading...</div>}>
              {categories && categories.length > 0 ? (
                <CategoryList
                  categories={categories}
                  setCategories={setCategories}
                />
              ) : (
                <div className={styles.no__categories}>
                  <i className="fas fa-box-open"></i>
                  <p>No Categories Added</p>
                </div>
              )}
              <CategoryPreview categories={categories} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
