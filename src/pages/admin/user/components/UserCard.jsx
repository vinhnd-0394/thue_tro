/* eslint-disable react/prop-types */
import { userDefault } from '../../../../assets/images';
import momentUtils from '../../../../utils/momentUtils';
import { toast } from 'react-toastify';
const UserCard = ({ user, index }) => {
  return (
    <tr
      className="text-center text-black bg-white border-b cursor-pointer hover:bg-gray-100"
      key={user.id}
    >
      <td scope="row" className="w-5 px-6 py-4 font-medium whitespace-nowrap">
        {index}
      </td>
      <td className="px-6 py-4">
        <div className="mx-auto relative w-[60px] h-[60px] bg-gray-100 rounded-full">
          <div className="w-full pt-[100%]">
            <img
              src={user.avatar ? user.avatar : userDefault}
              alt={user.name}
              className="absolute top-0 left-0 object-contain w-full h-full"
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-ellipsis max-w-[150px] text-nowrap overflow-hidden">
        {user.name}
      </td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.phoneNumber}</td>
      <td className="px-6 py-4">{user.realEstateCount}</td>
      <td className="px-6 py-4">
        {momentUtils(user.createdAt).format('YYYY-MM-DD HH:mm:ss')}
      </td>
      <td className="px-6 py-4">
        <button className="bg-yellow-500 w-[40px] h-[40px] p-2 rounded text-white font-semibold mx-auto mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </button>
        <button className="bg-red-500 w-[40px] h-[40px] p-2 rounded text-white font-semibold mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default UserCard;
