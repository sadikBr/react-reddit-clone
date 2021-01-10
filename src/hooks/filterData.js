import * as timeago from "timeago.js";

export default function filterData(posts) {
  return posts
    .map((post) => {
      const filteredPost = {};

      if (/(.jpe?g|.png|.gif)$/.test(post.data.url)) {
        filteredPost.id = post.data.id;
        filteredPost.isImage = true;
        filteredPost.title =
          post.data.title.length < 45
            ? post.data.title
            : post.data.title.slice(0, 45) + " ...";
        filteredPost.image = post.data.url;
      } else if (post.data.url.endsWith(".mp4")) {
        filteredPost.id = post.data.id;
        filteredPost.isVideo = true;
        filteredPost.title =
          post.data.title.length < 45
            ? post.data.title
            : post.data.title.slice(0, 45) + " ...";
        filteredPost.video = post.data.url;
      } else if (
        post.data.url.startsWith("https://i.imgur.com") &&
        !post.data.url.endsWith(".gifv")
      ) {
        filteredPost.id = post.data.id;
        filteredPost.isImage = true;
        filteredPost.title =
          post.data.title.length < 45
            ? post.data.title
            : post.data.title.slice(0, 45) + " ...";
        filteredPost.image = post.data.url.slice(0, -2);
      } else if (/(.gifv)$/.test(post.data.url)) {
        filteredPost.id = post.data.id;
        filteredPost.isVideo = true;
        filteredPost.title =
          post.data.title.length < 45
            ? post.data.title
            : post.data.title.slice(0, 45) + " ...";
        filteredPost.video = post.data.url.replace(".gifv", ".mp4");
      } else if (
        post.data.url.startsWith("https://v.redd.it") &&
        post.data.media
      ) {
        filteredPost.id = post.data.id;
        filteredPost.isVideo = true;
        filteredPost.title =
          post.data.title.length < 45
            ? post.data.title
            : post.data.title.slice(0, 45) + " ...";
        filteredPost.video = post.data.media.reddit_video.fallback_url;
      } else if (post.data.preview && post.data.preview.reddit_video_preview) {
        filteredPost.id = post.data.id;
        filteredPost.isVideo = true;
        filteredPost.title =
          post.data.title.length < 45
            ? post.data.title
            : post.data.title.slice(0, 45) + " ...";
        filteredPost.video =
          post.data.preview.reddit_video_preview.fallback_url;
      } else if (post.data.preview && post.data.preview.reddit_video) {
        filteredPost.id = post.data.id;
        filteredPost.isVideo = true;
        filteredPost.title =
          post.data.title.length < 45
            ? post.data.title
            : post.data.title.slice(0, 45) + " ...";
        filteredPost.video = post.data.preview.reddit_video.fallback_url;
      } else if (
        post.data.secure_media_embed &&
        post.data.secure_media_embed.content
      ) {
        filteredPost.id = post.data.id;
        filteredPost.isFrame = true;
        filteredPost.embedHTML = post.data.secure_media_embed.content;
        filteredPost.title =
          post.data.title.length < 45
            ? post.data.title
            : post.data.title.slice(0, 45) + " ...";
      } else if (post.data.selftext) {
        filteredPost.id = post.data.id;
        filteredPost.isText = true;
        filteredPost.textContent = post.data.selftext;
        filteredPost.title =
          post.data.title.length < 45
            ? post.data.title
            : post.data.title.slice(0, 45) + " ...";
      } else {
        filteredPost.non_conform = true;
      }

      filteredPost.created_by = post.data.author;
      filteredPost.created_at = timeago.format(post.data.created_utc * 1000);
      filteredPost.score = post.data.score.toLocaleString(undefined, {
        minimumFractionDigits: 0,
      });

      return filteredPost;
    })
    .filter((post) => !post.non_conform);
}
