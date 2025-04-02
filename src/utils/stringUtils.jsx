import { videoExtensions } from '../constants/sampleConstant';

/* eslint-disable no-useless-escape */
export const formatProvinceName = (name) => {
  if (name.includes('Thành phố ')) return name.slice(10);
  return name.slice(5);
};

export const formatDistrictName = (name) => {
  if (name.includes('Quận ')) return name.slice(5);
  if (name.includes('Huyện ')) return name.slice(6);
  if (name.includes('Thành phố ')) return name.slice(10);
  return name.slice(7);
};

export const formatWardName = (name) => {
  if (name.includes('Xã ')) return name.slice(3);
  if (name.includes('Phường ')) return name.slice(7);
  if (name.includes('Thị trấn ')) return name.slice(9);
  // return name.slice(7);
};

const removeSpecialCharacter = (str) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ''
  );

export const generateNameId = ({ name, realEstateId }) => {
  return (
    removeSpecialCharacter(name).replace(/\s/g, '-') + `-id-${realEstateId}`
  );
};

export const getIdFromNameId = (nameId) => {
  const arr = nameId.split('-id-');
  return arr[arr.length - 1];
};

export const checkMediaTypeFromUrl = (url) => {
  const ext = url.substring(url.lastIndexOf('.'));
  return videoExtensions.includes(ext);
};
