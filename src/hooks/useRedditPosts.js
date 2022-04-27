import { useState, useEffect } from 'react';
import filterData from './filterData';

import axios from 'axios';

const useRedditPosts = (searchTerm, sortType, after) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [afterPost, setAfterPost] = useState(undefined);

  document.title = `Reddit Clone - r/${searchTerm.replace(/ /g, '')}`;

  useEffect(() => {
    setPosts([]);
  }, [searchTerm, sortType]);

  useEffect(() => {
    setLoading(true);
    setError('');
    axios({
      method: 'GET',
      url: `https://www.reddit.com/r/${searchTerm.replace(/ /g, '')}/${
        sortType.sort
      }/.json`,
      params: {
        include_over_18: true,
        limit: '20',
        sort: sortType.sort,
        t: sortType.t,
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
  }, [searchTerm, sortType, after]);

  return { loading, error, posts, afterPost };
};

export default useRedditPosts;
