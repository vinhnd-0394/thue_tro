export const filterProvince = (listProvinces, provinceName) => {
  return listProvinces?.find((pro) => pro.Name.includes(provinceName));
};

export const filterDistrict = (listDistricts, districtName) => {
  return listDistricts.find((dist) => dist.Name.includes(districtName));
};

export const filterWards = (listWards, wardsName) => {
  return listWards.find((wards) => wards.Name.includes(wardsName));
};

export const formatAddress = (address) => {
  return address.map((item) => {
    return {
      id: item.Id,
      value: item.Name,
    };
  });
};
