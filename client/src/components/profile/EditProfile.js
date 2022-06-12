import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { updateProfileUser } from '../../redux/actions/profileAction';
import { checkImage } from '../../utils/imageUpload';

const EditProfile = ({ setOnEdit }) => {
  const initState = {
    fullname: '',
    mobile: '',
    address: '',
    gender: '',
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, mobile, address, gender } = userData;

  const [avatar, setAvatar] = useState('');

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });

    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
    setOnEdit(false);
  };

  return (
    <div className="edit_profile">
      <button
        className="btn btn_close"
        onClick={() => setOnEdit(false)}
        style={{
          borderRadius: '50px',
          background: '#E4E6EB',
          fontWeight: 'bold',
          color: '#606770',
          fontSize: '20px',
        }}
      >
        &times;
      </button>

      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="avatar" />
          <span>
            <i className="fas fa-camera" />
            <p>Thay Đổi</p>
            <input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar} />
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="fullname">Tên Đầy Đủ</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInput}
              style={{
                borderRadius: '50px',
              }}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: '50%',
                right: '5px',
                transform: 'translateY(-50%)',
              }}
            >
              {fullname.length}/25
            </small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Số Điện Thoại</label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            className="form-control"
            onChange={handleInput}
            style={{
              borderRadius: '50px',
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Địa Chỉ</label>
          <input
            type="text"
            name="address"
            value={address}
            className="form-control"
            onChange={handleInput}
            style={{
              borderRadius: '50px',
            }}
          />
        </div>

        <label htmlFor="gender">Giới Tính</label>
        <div className="input-group-prepend px-0 mb-4">
          <select
            name="gender"
            id="gender"
            value={gender}
            className="custom-select text-capitalize"
            onChange={handleInput}
            style={{
              borderRadius: '50px',
            }}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <button
          className="btn btn-success w-100"
          type="submit"
          style={{
            borderRadius: '50px',
          }}
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
