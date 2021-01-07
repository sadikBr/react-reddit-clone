import React, { useState } from "react";

import MarkdownIt from "markdown-it";

const MediaEmbeder = ({ media, lastPostRef }) => {
  const [md] = useState(new MarkdownIt());

  function renderMedia(media) {
    if (media.isImage) {
      return renderImage(media);
    } else if (media.isVideo) {
      return renderVideo(media);
    } else if (media.isText) {
      return renderText(media);
    } else if (media.isFrame) {
      return renderFrame(media);
    }
  }

  function renderText(media) {
    return (
      <div className="card">
        <p
          className="text"
          dangerouslySetInnerHTML={{ __html: md.render(media.textContent) }}
        />
        <h1 className="title">{media.title}</h1>
      </div>
    );
  }

  function renderImage(media) {
    return (
      <div className="card">
        <img src={media.image} alt={media.title} />
        <h1 className="title">{media.title}</h1>
      </div>
    );
  }

  function renderVideo(media) {
    return (
      <div className="card">
        <video controls src={media.video}></video>
        <h1 className="title">{media.title}</h1>
      </div>
    );
  }

  function renderFrame(media) {
    const txtArea = document.createElement("textarea");
    txtArea.innerHTML = media.embedHTML.replace(
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
