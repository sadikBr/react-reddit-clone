import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import LoadingComponent from "./components/LoadingComponent";
import ErrorComponent from "./components/ErrorComponent";
import ResultsSection from "./components/ResultsSection";

import { useState, useRef, useCallback } from "react";
import useRedditPosts from "./hooks/useRedditPosts";

import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("awww");
  const [after, setAfter] = useState("");
  const { loading, error, posts, afterPost } = useRedditPosts(
    searchTerm,
    after
  );

  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (afterPost) setAfter(afterPost);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, afterPost]
  );

  return (
    <>
      <NavBar setAfter={setAfter} setSearchTerm={setSearchTerm} />
      {error && <ErrorComponent errorMsg={error} />}
      {posts && posts.length > 0 && (
        <ResultsSection lastPostRef={lastPostRef} data={posts} />
      )}
      {loading && <LoadingComponent />}

      <ScrollToTop />
    </>
  );
}

export default App;
