/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import useClickOutSide from '../../../../../hooks/useClickOutSide';
import { AppContext } from '../../../../../contexts/app.context';

const InputMessage = () => {
  const { socket, currentPrivateChat } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const { show, setShow, nodeRef: emojiRef } = useClickOutSide();
  const handleSendMessage = async () => {
    if (message.length > 0) {
      const payload = {
        message: message.trim(),
        inboxHash: currentPrivateChat.inboxDetail.inboxHash,
        ownerInboxId: currentPrivateChat.inboxDetail.id,
        recipientId: currentPrivateChat.inboxDetail.recipient.id,
      };
      socket.emit('chat', payload);
      setMessage('');
    }
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleClickEmoji = (e) => {
    setMessage((prev) => prev + e.emoji);
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t">
      <input
        type="text"
        value={message}
        className="flex-1 p-2 border border-gray-400 outline-none rounded-3xl"
        placeholder="Nhập tin nhắn"
        onChange={handleChangeMessage}
      />
      <div className="relative flex items-center" ref={emojiRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0 h.008 v.015 h-.008 V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0 h.008 v.015 h-.008 V9.75Z"
          />
        </svg>
        {show && (
          <div className="absolute right-0 bottom-full">
            <EmojiPicker onEmojiClick={handleClickEmoji} />
          </div>
        )}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 cursor-pointer"
        onClick={handleSendMessage}
      >
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
      </svg>
    </div>
  );
};

export default InputMessage;
