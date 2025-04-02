/* eslint-disable react/prop-types */
import { useContext, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AppContext } from '../../../contexts/app.context';
import { contactSuggestions } from '../../../constants/sampleConstant';
import { apiCreateContact } from '../../../apis/user/manager/contact.api';
import { apiCreateContactWithoutLogin } from '../../../apis/user/contact.api';
import { toast } from 'react-toastify';
import { userDefault } from '../../../assets/images';

const ContactModal = ({
  open = false,
  handleClose = () => {},
  realEstate,
  user,
}) => {
  const [note, setNote] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [loading, setLoading] = useState(false);
  const { usersOnline } = useContext(AppContext);

  const [textareaHeight, setTextareaHeight] = useState('auto');

  const { owner, id: realEstateId } = realEstate;

  const handleClickMessage = (note) => {
    setTextareaHeight('auto');
    setNote(note.text);
  };

  const handleChangeMessage = (e) => {
    if (e.target.value.length <= 256) {
      setTextareaHeight('auto');
      setNote(e.target.value);
    }
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  useLayoutEffect(() => {
    const textareaDoc = document.getElementById('note');
    setTextareaHeight(`${textareaDoc?.scrollHeight}px`);
  }, [note]);

  const handleSubmit = async () => {
    if (note.trim().length > 0) {
      setLoading(true);
      const payload = {
        note: note.trim(),
        name: name.trim(),
        phoneNumber: phoneNumber.trim(),
        realEstateId,
        toOwnerId: owner.id,
      };
      let response = '';
      console.log('user', user);
      if (user) {
        response = await apiCreateContact(payload);
      } else {
        response = await apiCreateContactWithoutLogin(payload);
      }
      if (response.status === 201) {
        toast.success('Đã gửi yêu cầu cho đối phương');
        setNote('');
        setLoading(false);
        handleClose();
      }
    }
  };
  if (typeof document === 'undefined') return <div className="modal"></div>;
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-5 modal ${
        open ? '' : 'opacity-0 invisible'
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-25 overlay"
        onClick={handleClose}
      ></div>
      <div className="relative z-10 w-full p-5 bg-white rounded-lg modal-content max-w-[480px]">
        <span
          className="absolute top-0 right-0 flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full cursor-pointer -translate-y-2/4 translate-x-2/4 hover:bg-gray-200"
          onClick={handleClose}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.225 7L13.7375 1.4875C14.0875 1.1375 14.0875 0.6125 13.7375 0.2625C13.3875 -0.0875 12.8625 -0.0875 12.5125 0.2625L7 5.775L1.4875 0.2625C1.1375 -0.0875 0.6125 -0.0875 0.2625 0.2625C-0.0874998 0.6125 -0.0874998 1.1375 0.2625 1.4875L5.775 7L0.2625 12.5125C0.0875002 12.6875 0 12.8625 0 13.125C0 13.65 0.35 14 0.875 14C1.1375 14 1.3125 13.9125 1.4875 13.7375L7 8.225L12.5125 13.7375C12.6875 13.9125 12.8625 14 13.125 14C13.3875 14 13.5625 13.9125 13.7375 13.7375C14.0875 13.3875 14.0875 12.8625 13.7375 12.5125L8.225 7Z"
              fill="#84878B"
            />
          </svg>
        </span>
        <div>
          <h2 className="mb-5 text-4xl font-medium text-center text-black"></h2>
        </div>
        <div className="flex items-center gap-5 p-3 cursor-pointer">
          <div className="relative w-[50px] h-[50px] bg-gray-200 rounded-full">
            <div className="w-full pt-[100%]">
              <img
                className="absolute top-0 left-0 object-contain w-full h-full rounded-full"
                src={owner.avatar || userDefault}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <h3 className="font-bold">{owner.name}</h3>
              {usersOnline?.some((userId) => userId == owner.id) ? (
                <span>
                  <i className="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full"></i>
                  <span className="text-[#bdb9b9] text-sm">Đang hoạt động</span>
                </span>
              ) : (
                <span className="text-xs">Offline</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 mb-5">
          <div className="flex gap-5">
            <div className="relative w-[100px] h-[100px] bg-gray-200">
              <div className="w-full pt-[100%]">
                <img
                  className="absolute top-0 left-0 object-contain w-full h-full rounded-full"
                  src={realEstate.thumb}
                />
              </div>
            </div>
            <div className="flex-1 font-bold">
              <span
                className="overflow-hidden text-gray-600"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  lineClamp: 2,
                }}
              >
                {realEstate.title}
              </span>
              <p className="text-sm text-green-500">
                {realEstate.rentPrice} triệu/tháng
              </p>
            </div>
          </div>
          <div>
            <label htmlFor="name">Họ tên</label>
            <input
              type="text"
              name="name"
              className="w-full text-sm leading-normal bg-[#E7ECF3] rounded-lg p-2 border border-gray-200 focus:border-blue-500 outline-none transition-all"
              value={name}
              onChange={handleChangeName}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
              type="text"
              name="phoneNumber"
              className="w-full text-sm leading-normal bg-[#E7ECF3] rounded-lg p-2 border border-gray-200 focus:border-blue-500 outline-none transition-all"
              value={phoneNumber}
              onChange={handleChangePhoneNumber}
            />
          </div>
          <ul className="p-2 overflow-x-auto text-xs whitespace-nowrap">
            {contactSuggestions.map((note) => (
              <li
                key={note.key}
                className="inline-block p-1 mr-1 cursor-pointer rounded-3xl"
                onClick={() => handleClickMessage(note)}
                style={{ boxShadow: '0 0 6px rgba(0,0,0,.15)' }}
              >
                {note.text}
              </li>
            ))}
          </ul>
          <textarea
            id="note"
            rows="2"
            value={note}
            onChange={handleChangeMessage}
            type="note"
            className="w-full text-sm leading-normal bg-[#E7ECF3] rounded-lg p-2 border border-gray-200 focus:border-blue-500 outline-none transition-all overflow-y-hidden"
            placeholder="Nhập nội dung"
            style={{
              height: textareaHeight,
            }}
          />
          <p
            className={`text-xs text-right ${
              note.length === 256 ? 'text-red-500 font-bold' : 'text-gray-400'
            }`}
          >{`${note.length} / 256`}</p>
        </div>
        <button
          className="w-full p-4 text-base font-semibold text-white bg-[#316BFF] rounded-lg"
          onClick={handleSubmit}
          disabled={loading}
        >
          Gửi yêu cầu
        </button>
      </div>
    </div>,
    document.querySelector('body')
  );
};
export default ContactModal;
