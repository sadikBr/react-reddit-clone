import { useState, useEffect } from "react";

import axios from "axios";

function filterData(posts) {
  return posts
    .map((post) => {
      const filteredPost = {};

      if (/(.jpe?g|.png|.gif)$/.test(post.data.url)) {
        filteredPost.id = post.data.id;
        filteredPost.isImage = true;
        filteredPost.title = post.data.title;
        filteredPost.image = post.data.url;
      } else if (
        post.data.url.startsWith("https://i.imgur.com") &&
        !post.data.url.endsWith(".gifv")
      ) {
        filteredPost.id = post.data.id;
        filteredPost.isImage = true;
        filteredPost.title = post.data.title;
        filteredPost.image = post.data.url.slice(0, -2);
      } else if (/(.gifv)$/.test(post.data.url)) {
        filteredPost.id = post.data.id;
        filteredPost.isVideo = true;
        filteredPost.title = post.data.title;
        filteredPost.video = post.data.url.replace(".gifv", ".mp4");
      } else if (post.data.selftext) {
        filteredPost.id = post.data.id;
        filteredPost.isText = true;
        filteredPost.textContent = post.data.selftext;
        filteredPost.title = post.data.title;
      } else if (
        post.data.url.startsWith("https://v.redd.it") &&
        post.data.media
      ) {
        filteredPost.id = post.data.id;
        filteredPost.isVideo = true;
        filteredPost.title = post.data.title;
        filteredPost.video = post.data.media.reddit_video.fallback_url;
      } else if (post.data.preview && post.data.preview.reddit_video_preview) {
        filteredPost.id = post.data.id;
        filteredPost.isVideo = true;
        filteredPost.title = post.data.title;
        filteredPost.video =
          post.data.preview.reddit_video_preview.fallback_url;
      } else if (post.data.preview && post.data.preview.reddit_video) {
        filteredPost.id = post.data.id;
        filteredPost.isVideo = true;
        filteredPost.title = post.data.title;
        filteredPost.video = post.data.preview.reddit_video.fallback_url;
      } else if (
        post.data.secure_media_embed &&
        post.data.secure_media_embed.content
      ) {
        filteredPost.id = post.data.id;
        filteredPost.isFrame = true;
        filteredPost.embedHTML = post.data.secure_media_embed.content;
        filteredPost.title = post.data.title;
      } else {
        filteredPost.non_conform = true;
      }

      return filteredPost;
    })
    .filter((post) => !post.non_conform);
}

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
