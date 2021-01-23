import { useState, useEffect } from 'react';

import axios from 'axios';

const useAboutSubreddit = (subreddit) => {
  const [subredditInfo, setSubredditInfo] = useState({});

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://www.reddit.com/r/${subreddit.replace(
        / /g,
        ''
      )}/about/.json`,
    })
      .then((response) => {
        const {
          banner_img,
          display_name,
          icon_img,
          public_description,
          subscribers,
          created_utc,
        } = response.data.data;
        setSubredditInfo({
          banner_img,
          display_name,
          icon_img,
          public_description,
          subscribers,
          created_utc,
        });
      })
      .catch(() => {
        setSubredditInfo({});
      });
  }, [subreddit]);

  return subredditInfo;
};

export default useAboutSubreddit;
