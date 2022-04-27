import NavBar from './components/NavBar';
import ScrollToTop from './components/ScrollToTop';
import LoadingComponent from './components/LoadingComponent';
import ErrorComponent from './components/ErrorComponent';
import ResultsSection from './components/ResultsSection';
import SubredditInfo from './components/SubredditInfo';

import { useState, useRef, useCallback } from 'react';
import useRedditPosts from './hooks/useRedditPosts';
import useAboutSubreddit from './hooks/useAboutSubreddit';

import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('aww');
  const [after, setAfter] = useState('');
  const [sortType, setSortType] = useState({
    sort: 'new',
    t: '',
  });
  const { loading, error, posts, afterPost } = useRedditPosts(
    searchTerm,
    sortType,
    after
  );

  const subredditInfo = useAboutSubreddit(searchTerm);

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
      <NavBar
        setAfter={setAfter}
        setSearchTerm={setSearchTerm}
        setSortType={setSortType}
      />
      {error && <ErrorComponent errorMsg={error} />}
      {subredditInfo && <SubredditInfo subredditInfo={subredditInfo} />}
      {posts && posts.length > 0 && (
        <ResultsSection lastPostRef={lastPostRef} data={posts} />
      )}
      {loading && <LoadingComponent />}

      <ScrollToTop />
    </>
  );
}

export default App;
