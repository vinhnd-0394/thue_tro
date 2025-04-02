/* eslint-disable react/prop-types */
import { useContext } from 'react';
import Inbox from './components/Inbox';
import { AppContext } from '../../../../../contexts/app.context';

const ListInboxes = () => {
  const { myInboxes } = useContext(AppContext);
  return myInboxes.length ? (
    myInboxes.map((inbox) => <Inbox inbox={inbox} key={inbox.id} />)
  ) : (
    <div className='flex items-center justify-center h-full font-bold'> Không có cuộc trò chuyện nào</div>
  );
};

export default ListInboxes;
