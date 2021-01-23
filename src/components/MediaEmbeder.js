import React, { useState } from 'react';

import MarkdownIt from 'markdown-it';

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
      <div className='card'>
        <p
          className='text'
          dangerouslySetInnerHTML={{ __html: md.render(media.textContent) }}
        />
        <h1 className='title'>
          {media.title.length} <span className='score'>{media.score}</span>
        </h1>
        <div className='author_container'>
          created {media.created_at} by{' '}
          <a
            href={`https://www.reddit.com/u/${media.created_by}`}
            className='author'
          >
            {media.created_by}
          </a>
        </div>
      </div>
    );
  }

  function renderImage(media) {
    return (
      <div className='card'>
        <img src={media.image} alt={media.title} />
        <h1 className='title'>
          {media.title} <span className='score'>{media.score}</span>
        </h1>
        <div className='author_container'>
          created {media.created_at} by{' '}
          <a
            href={`https://www.reddit.com/u/${media.created_by}`}
            className='author'
          >
            {media.created_by}
          </a>
        </div>
      </div>
    );
  }

  function renderVideo(media) {
    return (
      <div className='card'>
        <video controls src={media.video}></video>
        <h1 className='title'>
          {media.title} <span className='score'>{media.score}</span>
        </h1>
        <div className='author_container'>
          created {media.created_at} by{' '}
          <a
            href={`https://www.reddit.com/u/${media.created_by}`}
            className='author'
          >
            {media.created_by}
          </a>
        </div>
      </div>
    );
  }

  function renderFrame(media) {
    const txtArea = document.createElement('textarea');
    txtArea.innerHTML = media.embedHTML.replace(
      'style="position:absolute;"',
      ''
    );

    return (
      <div
        className='card'
        dangerouslySetInnerHTML={{
          __html:
            txtArea.value +
            `<h1 class="title">
              ${media.title} <span class="score">${media.score}</span>
            </h1>
            <div class="author_container">
              created ${media.created_at} by <a href="https://www.reddit.com/u/${media.created_by}" class="author">${media.created_by}</a>
            </div>`,
        }}
      />
    );
  }

  return (
    <div ref={lastPostRef && lastPostRef} className='card-container'>
      {renderMedia(media)}
    </div>
  );
};

export default MediaEmbeder;
