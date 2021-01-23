const SubredditInfo = ({ subredditInfo }) => {
  if (subredditInfo !== {}) {
    const {
      banner_img,
      display_name,
      icon_img,
      public_description,
    } = subredditInfo;

    return (
      <div className='container'>
        <div className='banner'>
          {banner_img && <img src={banner_img} alt='banner' />}
        </div>
        <div className='name'>
          {icon_img && <img className='icon' src={icon_img} alt='icon' />}
          <div className='sr-title'>
            <h2>{display_name}</h2>
            <p>{public_description}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default SubredditInfo;
