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
          banner_background_image,
          community_icon,
          display_name,
          icon_img,
          public_description,
        } = response.data.data;
        setSubredditInfo({
          banner_img,
          banner_background_image: banner_background_image.substr(
            0,
            banner_background_image.split('').indexOf('?')
          ),
          community_icon: community_icon.substr(
            0,
            community_icon.split('').indexOf('?')
          ),
          display_name,
          icon_img,
          public_description,
        });
      })
      .catch(() => {
        setSubredditInfo({});
      });
  }, [subreddit]);

  return subredditInfo;
};

export default useAboutSubreddit;
