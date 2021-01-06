import React, { useState } from "react";

import MarkdownIt from "markdown-it";

const MediaEmbeder = ({ media, lastPostRef }) => {
  const [md] = useState(new MarkdownIt());

  function renderMedia(media) {
    if (
      /(.jpe?g|.png|.gif)$/.test(media.url) ||
      (media.url.startsWith("https://i.imgur.com") &&
        !media.url.endsWith(".gifv"))
    ) {
      return renderImage(media);
    } else if (
      /(.gifv)$/.test(media.url) ||
      (media.url.startsWith("https://gfycat.com") &&
        media.preview.reddit_video_preview) ||
      media.url.startsWith("https://v.redd.it") ||
      (media.url.startsWith("https://redgifs.com") &&
        !media.secure_media_embed.content)
    ) {
      return renderVideo(media);
    } else if (media.secure_media_embed && media.secure_media_embed.content) {
      return renderFrame(media);
    } else {
      return renderText(media);
    }
  }

  function renderText(media) {
    return (
      <div className="card">
        <p
          className="text"
          dangerouslySetInnerHTML={{ __html: md.render(media.selftext) }}
        />
        <h1 className="title">{media.title}</h1>
      </div>
    );
  }

  function renderImage(media) {
    let url = "";
    if (/(.jpe?g|.png|.gif)$/.test(media.url)) {
      url = media.url;
    } else {
      url = media.url.slice(0, -2);
    }
    return (
      <div className="card">
        <img src={url} alt={media.title} />
        <h1 className="title">{media.title}</h1>
      </div>
    );
  }

  function renderVideo(media) {
    let url = "";
    if (media.url.endsWith(".gifv")) {
      url = media.url.replace(".gifv", ".mp4");
    } else if (media.url.startsWith("https://v.redd.it") && media.media) {
      url = media.media.reddit_video.fallback_url;
    } else if (media.preview && media.preview.reddit_video_preview) {
      url = media.preview.reddit_video_preview.fallback_url;
    } else if (media.preview && media.preview.reddit_video) {
      url = media.preview.reddit_video.fallback_url;
    }
    return (
      <div className="card">
        <video controls src={url}></video>
        <h1 className="title">{media.title}</h1>
      </div>
    );
  }

  function renderFrame(media) {
    const txtArea = document.createElement("textarea");
    txtArea.innerHTML = media.secure_media_embed.content.replace(
      'style="position:absolute;"',
      ""
    );

    return (
      <div
        className="card"
        dangerouslySetInnerHTML={{
          __html: txtArea.value + `<h1 class="title">${media.title}</h1>`,
        }}
      />
    );
  }

  return (
    <div ref={lastPostRef && lastPostRef} className="card-container">
      {renderMedia(media)}
    </div>
  );
};

export default MediaEmbeder;
