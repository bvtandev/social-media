import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { likePost, unLikePost } from '../../../redux/actions/postAction';
import { BASE_URL } from '../../../utils/config';
import LikeButton from '../../button/LikeBtn';
import ShareModal from '../create_post/ShareModal';

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [isShare, setIsShare] = useState(false);

  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  // Likes
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  // Saved
  useEffect(() => {}, [post._id]);

  return (
    <div className="card_footer">
      <div className="d-flex justify-content-between " style={{ borderBottom: '0.5px solid rgb(216,216,216)' }}>
        <h6
          style={{
            padding: '5px 15px 0 15px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '350',
            color: '#65676B',
          }}
        >
          <i
            className="fa fa-heart"
            style={{
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '350',
              color: '#65676B',
            }}
          ></i>{' '}
          {post.likes.length}
        </h6>

        <h6
          style={{
            padding: '5px 15px 0 15px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '350',
            color: '#65676B',
          }}
        >
          {post.comments.length} bình luận
        </h6>
      </div>
      <div className="card_icon_menu" style={{ padding: '4px', borderBottom: '0.5px solid rgb(216,216,216) ' }}>
        <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />

        <div className="post_bottom_action_item">
          <Link to={`/post/${post._id}`} className="post_bottom_action_item-Text text-dark">
            Bình luận
          </Link>
        </div>

        <div className="post_bottom_action_item">
          <span
            className="post_bottom_action_item-Text"
            style={{ padding: '8px' }}
            onClick={() => setIsShare(!isShare)}
          >
            Chia sẻ
          </span>
        </div>
      </div>

      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} />}
    </div>
  );
};

export default CardFooter;
