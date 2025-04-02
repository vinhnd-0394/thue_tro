import ChatBox from './layouts/ChatBox';
import UserInfo from './layouts/UserInfo';
import InputMessage from './layouts/InputMessage';

const PrivateChat = () => {
  return (
    <div className="flex flex-col h-full">
      <UserInfo />
      <ChatBox />
      <InputMessage />
    </div>
  );
};

export default PrivateChat;
