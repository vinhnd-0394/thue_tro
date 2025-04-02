/* eslint-disable react/prop-types */
import { Link, createSearchParams } from 'react-router-dom';
import {
  filterDistrict,
  filterProvince,
} from '../../../../utils/filterAddress';

const SidebarAddress = ({ queryParams, addressData }) => {
  const showSidebarAddress = () => {
    if (queryParams.district && queryParams.province) {
      const province = filterProvince(addressData, queryParams.province);
      if (province) {
        const district = filterDistrict(
          province.Districts,
          queryParams.district
        );
        if (district) {
          return (
            <div className="flex flex-col gap-2 ">
              {district.Wards.map((wards) => {
                const isActive = queryParams?.wards === wards.Name;
                return (
                  <Link
                    to={{
                      pathname: '/',
                      search: createSearchParams({
                        ...queryParams,
                        wards: wards.Name,
                      }).toString(),
                    }}
                    key={wards.Id}
                    className={`underline relative px-2 text-sm ${
                      isActive ? 'text-red-500 font-bold' : 'text-blue-500'
                    }`}
                  >
                    {isActive && (
                      <svg
                        viewBox="0 0 4 7"
                        className="absolute w-2 h-2 -left-1 top-1 fill-red-500"
                      >
                        <polygon points="4 3.5 0 0 0 7" />
                      </svg>
                    )}
                    {wards.Name}
                  </Link>
                );
              })}
            </div>
          );
        }
      }
    }

    if (queryParams.province) {
      const province = filterProvince(addressData, queryParams.province);
      return (
        <div className="flex flex-col gap-2 ">
          {province?.Districts.map((district) => {
            return (
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...queryParams,
                    district: district.Name,
                  }).toString(),
                }}
                key={district.Id}
                className="relative px-2 text-sm text-blue-500 underline"
              >
                {district.Name}
              </Link>
            );
          })}
        </div>
      );
    }

    // return (
    //   <div className="flex flex-col gap-2 ">
    //     {sampleAddress.map((province) => (
    //       <Link
    //         to={{
    //           pathname: '/',
    //           search: createSearchParams({
    //             ...queryParams,
    //             province: province.name,
    //           }).toString(),
    //         }}
    //         key={province.id}
    //         className="relative px-2 text-sm text-blue-500 underline"
    //       >
    //         {province.text}
    //       </Link>
    //     ))}
    //   </div>
    // );
  };
  return showSidebarAddress();
};

export default SidebarAddress;
