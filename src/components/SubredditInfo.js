const SubredditInfo = ({ subredditInfo }) => {
  const {
    banner_img,
    display_name,
    banner_background_image,
    community_icon,
    icon_img,
    public_description,
  } = subredditInfo;

  return subredditInfo.display_name ? (
    <div className='container'>
      <div className='banner'>
        {banner_img ? (
          <img src={banner_img} alt='banner' />
        ) : banner_background_image ? (
          <img src={banner_background_image} alt='banner' />
        ) : (
          ''
        )}
      </div>
      <div className='name'>
        {icon_img ? (
          <img className='icon' src={icon_img} alt='icon' />
        ) : community_icon ? (
          <img className='icon' src={community_icon} alt='icon' />
        ) : (
          ''
        )}
        <div className='sr-title'>
          <h2>{display_name}</h2>
          {public_description && <p>{public_description}</p>}
        </div>
      </div>
    </div>
  ) : null;
};

export default SubredditInfo;
