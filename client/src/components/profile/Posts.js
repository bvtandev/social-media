import { useEffect, useState } from 'react';
import { PROFILE_TYPES } from '../../redux/actions/profileAction';
import { getDataAPI } from '../../utils/fetchData';
import LoadData from '../alert/LoadData';
import LoadMoreBtn from '../button/LoadMoreBtn';
import PostThumb from '../PostThumb';

const Posts = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.result);
        setPage(data.page);
      }
    });
  }, [profile.posts, id]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`user_posts/${id}?limit=${page * 9}`, auth.token);
    const newData = { ...res.data, page: page + 1, _id: id };
    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData });
    setLoad(false);
  };

  return (
    <div>
      <PostThumb posts={posts} result={result} />

      {load && <LoadData />}

      <LoadMoreBtn result={result} page={page} load={load} handleLoadMore={handleLoadMore} />
    </div>
  );
};

export default Posts;
