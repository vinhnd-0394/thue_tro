import { useContext } from 'react';
import { AppContext } from '../../../../../contexts/app.context';

/* eslint-disable react/prop-types */
const UserInfo = () => {
  const { currentPrivateChat, usersOnline } = useContext(AppContext);
  const { inboxDetail } = currentPrivateChat;
  return (
    <div className="flex items-center gap-2 p-3 border-b">
      <div className="relative w-[50px] h-[50px] bg-gray-200 rounded-full">
        <div className="w-full pt-[100%]">
          <img
            className="absolute top-0 left-0 object-contain w-full h-full rounded-full"
            src={inboxDetail.recipient.avatar}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold">{inboxDetail.recipient.name}</h1>
        {usersOnline?.some((userId) => userId == inboxDetail.recipient.id) ? (
          <span>
            <i className="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full"></i>
            <span className="text-[#bdb9b9] text-sm">Đang hoạt động</span>
          </span>
        ) : (
          <span className="text-xs">Offline</span>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
