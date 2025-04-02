import { useCallback, useContext, useEffect, useState } from 'react';
import useQueryParams from '../../../hooks/useQueryParams';
import momentUtils from '../../../utils/momentUtils';
import Pagination from '../../../components/Pagination/Pagination';
import {
  apiConfirmContact,
  apiGetAllContacts,
} from '../../../apis/user/manager/contact.api';
import { AppContext } from '../../../contexts/app.context';
import { generateNameId } from '../../../utils/stringUtils';

const Contact = () => {
  const { profile } = useContext(AppContext);
  const [contactData, setContactData] = useState({
    contacts: [],
    totalCounts: 0,
  });

  const { queryParams } = useQueryParams();
  const fetchAllContacts = useCallback(async () => {
    const response = await apiGetAllContacts({
      limit: queryParams.limit,
      page: queryParams.page,
    });
    if (response.status === 200) {
      setContactData(response.data);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchAllContacts();
  }, [fetchAllContacts]);

  const handleConfirm = async (contactId) => {
    const response = await apiConfirmContact(contactId);
    if (response.status === 200) {
      fetchAllContacts();
    }
  };

  const handleRowClick = (item) => {
    const url = `/${generateNameId({
      name: item.realEstate.title,
      realEstateId: item.realEstate.id,
    })}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-5">
      <h1 className="text-lg font-bold">Yêu cầu liên lạc</h1>
      <div className="p-10">
        <table className="w-full text-sm text-left text-gray-500 border ">
          <thead className="text-xs font-bold text-center text-white uppercase bg-blue-500 border-b">
            <tr>
              <th className="px-6 py-3">STT</th>
              <th className="px-6 py-3">Bài đăng</th>
              <th className="px-6 py-3">Họ tên</th>
              <th className="px-6 py-3">Số điện thoại</th>
              <th className="px-6 py-3">Nội dung</th>
              <th className="px-6 py-3">Thời gian</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {contactData.totalCounts ? (
              contactData.contacts.map((item, index) => (
                <tr
                  className="text-center text-black bg-white border-b cursor-pointer hover:bg-gray-100"
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative w-[50px] h-[50px] bg-gray-200">
                      <div className="w-full pt-[100%]">
                        <img
                          className="absolute top-0 left-0 object-contain w-full h-full"
                          src={item.realEstate.thumb}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.phoneNumber}</td>
                  <td className="px-6 py-4">{item.note}</td>

                  <td className="px-6 py-4">
                    {momentUtils(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                  </td>
                  <td
                    className={`px-6 py-4 font-bold ${
                      item.status === 'Chấp nhận'
                        ? 'text-green-500'
                        : 'text-yellow-500'
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="px-6 py-4">
                    {item.status === 'Chấp nhận' ||
                    item.fromUser?.id == profile.id ? (
                      <></>
                    ) : (
                      <>
                        <button
                          className="bg-green-500 w-[40px] h-[40px] p-2 rounded text-white font-semibold mx-auto mr-2"
                          onClick={() => handleConfirm(item.id)}
                        >
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
                              d="m4.5 12.75 6 6 9-13.5"
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
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <th className="px-6 py-3">-</th>
                <th className="px-6 py-3">-</th>
                <th className="px-6 py-3">-</th>
                <th className="px-6 py-3">-</th>
                <th className="px-6 py-3">-</th>
                <th className="px-6 py-3">-</th>
                <th className="px-6 py-3">-</th>
              </tr>
            )}
          </tbody>
        </table>
        {contactData.totalCounts > 0 ? (
          <div className="mx-auto my-10">
            <Pagination totalCounts={contactData.totalCounts || 0} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Contact;
