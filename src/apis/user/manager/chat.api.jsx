import baseApi from '../../http.api';

export const apiSendMessage = async ({
  message,
  inboxHash,
  ownerInboxId,
  recipientId,
}) => {
  const payload = { message, inboxHash, ownerInboxId, recipientId };
  return await baseApi.post('/manager/chats', payload);
};
