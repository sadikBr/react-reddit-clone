import { useState, useEffect } from "react";
import filterData from "./filterData";

import axios from "axios";

const useRedditPosts = (searchTerm, after) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [afterPost, setAfterPost] = useState(undefined);

  useEffect(() => {
    setPosts([]);
  }, [searchTerm]);

  useEffect(() => {
    setLoading(true);
    setError("");
    axios({
      method: "GET",
      url: `https://www.reddit.com/r/${searchTerm.split(" ").join("")}/.json`,
      params: {
        limit: "20",
        after,
      },
    })
      .then((response) => {
        setPosts((prevPosts) => [
          ...prevPosts,
          ...filterData(response.data.data.children),
        ]);
        setAfterPost(response.data.data.after);
        setLoading(false);
      })
      .catch(() => {
        setError(`${searchTerm} NOT FOUND`);
        setLoading(false);
      });
  }, [searchTerm, after]);

  return { loading, error, posts, afterPost };
};

export default useRedditPosts;
