import { useState, useEffect } from "react";

import axios from "axios";

const useAutocomplete = (inputValue) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    let cancel;
    axios({
      method: "GET",
      url: "https://www.reddit.com/api/subreddit_autocomplete_v2/.json",
      params: {
        include_over_18: true,
        limit: "10",
        query: inputValue,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) =>
        setSuggestions(
          response.data.data.children.map((subreddit) => {
            if (subreddit.data.display_name) {
              return subreddit.data.display_name;
            } else {
              return subreddit.data.name;
            }
          })
        )
      )
      .catch((error) => {
        if (axios.isCancel(error)) return;
      });

    return () => cancel();
  }, [inputValue]);

  return { suggestions, setSuggestions };
};

export default useAutocomplete;
