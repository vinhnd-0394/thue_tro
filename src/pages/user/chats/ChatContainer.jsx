import ListInboxes from './layouts/inboxes/ListInboxes';
import { Outlet } from 'react-router-dom';

const ChatContainer = () => {
  return (
    <div className="flex h-[750px] max-h-[750px]">
      <div className="w-2/5 border-b border-r">
        <ListInboxes />
      </div>
      <div className="w-3/5 border-b">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatContainer;
