import { useCallback, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../../contexts/app.context';
import { apiGetInboxById } from '../../../../apis/user/manager/inbox.api';
import PrivateChat from './PrivateChat';

const PrivateChatContainer = () => {
  const { inboxId } = useParams();
  const navigate = useNavigate();
  const {
    setCurrentPrivateChat,
    setIsLoadingPrivateChat,
    setIsOpenPrivateChat,
    isOpenPrivateChat,
    currentPrivateChat,
  } = useContext(AppContext);

  const fetchPrivateChat = useCallback(async () => {
    setIsLoadingPrivateChat(true);
    const result = await apiGetInboxById(inboxId);
    if (result.status === 200) {
      setCurrentPrivateChat(result.data);
      setIsLoadingPrivateChat(false);
      setIsOpenPrivateChat(true);
    } else {
      setIsLoadingPrivateChat(false);
      navigate('/user/chats');
    }
  }, [
    inboxId,
    navigate,
    setCurrentPrivateChat,
    setIsLoadingPrivateChat,
    setIsOpenPrivateChat,
  ]);

  useEffect(() => {
    fetchPrivateChat();
  }, [fetchPrivateChat]);

  return isOpenPrivateChat && Object.keys(currentPrivateChat).length ? (
    <PrivateChat />
  ) : null;
};

export default PrivateChatContainer;
