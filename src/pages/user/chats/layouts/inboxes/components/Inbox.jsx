/* eslint-disable react/prop-types */

import { useContext } from 'react';
import { AppContext } from '../../../../../../contexts/app.context';
import { apiGetInboxById } from '../../../../../../apis/user/manager/inbox.api';
import { useNavigate } from 'react-router-dom';

import momentUtils from '../../../../../../utils/momentUtils';
import { userDefault } from '../../../../../../assets/images';

const Inbox = ({ inbox }) => {
  const {
    setCurrentPrivateChat,
    setIsLoadingPrivateChat,
    usersOnline,
    setIsOpenPrivateChat,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const fetchPrivateChat = async (inboxId) => {
    setIsLoadingPrivateChat(true);
    const result = await apiGetInboxById(inboxId);
    if (result.status === 200) {
      setCurrentPrivateChat(result.data);
      setIsLoadingPrivateChat(false);
      setIsOpenPrivateChat(true);
      navigate(`/user/chats/${inboxId}`);
    }
  };

  return (
    <div
      key={inbox.id}
      className="flex items-center gap-5 p-3 cursor-pointer"
      onClick={() => fetchPrivateChat(inbox.id)}
    >
      <div className="relative w-[50px] h-[50px] bg-gray-200 rounded-full">
        <div className="w-full pt-[100%]">
          <img
            className="absolute top-0 left-0 object-contain w-full h-full rounded-full"
            src={inbox.recipient.avatar || userDefault}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className={inbox.seen ? '' : 'font-bold'}>
            {inbox.recipient.name}
          </h3>
          {usersOnline?.some((userId) => userId == inbox.recipient.id) ? (
            <i className="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full"></i>
          ) : (
            <span className="text-xs">Offline</span>
          )}
        </div>
        <div
          className={`flex items-center justify-between gap-5 ${
            inbox.seen ? '' : 'font-bold'
          }`}
        >
          <div>
            {!inbox.seen && (
              <span className="w-[15px] h-[15px] bg-red-500 text-white rounded-full text-[10px] text-center inline-block mr-2">
                {inbox.unseenNumbers}
              </span>
            )}
            <span className="text-sm">
              {inbox.sentByOwner ? `Bạn: ${inbox.lastMsg}` : inbox.lastMsg}
            </span>
          </div>
          <span className="text-[10px] text-right">
            {momentUtils(inbox.updatedAt).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
