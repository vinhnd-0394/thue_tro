/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { memo, useContext, useEffect, useRef } from 'react';
import moment from 'moment';
import { AppContext } from '../../../../../contexts/app.context';

const ChatBox = memo(() => {
  const scrollMsg = useRef(null);

  const { profile, isLoadingPrivateChat, currentPrivateChat } =
    useContext(AppContext);

  const { privateChat } = currentPrivateChat;
  useEffect(() => {
    scrollMsg.current?.scrollIntoView({ behavior: 'smooth' });
  }, [privateChat]);
  return (
    <div className="flex-1 p-3 overflow-y-auto">
      {isLoadingPrivateChat ? (
        <div className="flex items-center justify-center h-full ">
          <span className="w-5 h-5 border-4 border-gray-400 rounded-full border-t-transparent animate-spin"></span>
        </div>
      ) : (
        <ul>
          {privateChat.length > 0 &&
            privateChat.map((chat) => {
              const isOwnerMessage = chat.senderId === profile.id;
              return (
                <li
                  ref={scrollMsg}
                  key={chat.id}
                  className={`mb-1 text-sm ${
                    isOwnerMessage ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`px-2 py-1 rounded-lg inline-block ${
                      isOwnerMessage
                        ? ' bg-blue-500 text-white'
                        : ' bg-gray-200 text-black'
                    }`}
                  >
                    <div>{chat.message}</div>
                    <div className="text-xs">
                      {moment(chat.createdAt).format('HH:mm')}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
});

export default ChatBox;
