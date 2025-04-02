export const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];

export const messageSuggestions = [
  {
    key: 1,
    text: 'Phòng này còn cho thuê không ạ?',
  },
  {
    key: 2,
    text: 'Vệ sinh khép kín không ạ?',
  },
  {
    key: 3,
    text: 'Có được nấu ăn trong phòng không ạ?',
  },
  {
    key: 4,
    text: 'Phòng ở được mấy người ạ?',
  },
];

export const contactSuggestions = [
  {
    key: 1,
    text: 'Tôi cần tư vấn thêm. Xin hãy liên lạc lại với tôi',
  },
  {
    key: 2,
    text: 'Tôi quan tâm đến phòng trọ này. Xin hãy liên lạc lại với tôi',
  },
];

export const rentPriceSearch = [
  {
    id: 1,
    keySearch: '1,lte',
    value: 'Dưới 1 triệu',
  },
  {
    id: 2,
    keySearch: '1,2',
    value: 'Từ 1 đến 2 triệu',
  },
  {
    id: 3,
    keySearch: '2,3',
    value: 'Từ 2 đến 3 triệu',
  },
  {
    id: 4,
    keySearch: '3,5',
    value: 'Từ 3 đến 5 triệu',
  },
  {
    id: 5,
    keySearch: '5,gte',
    value: 'Từ 5 triệu trở lên',
  },
];

export const areaSearch = [
  {
    id: 1,
    keySearch: '10,lte',
    value: 'Dưới 10m²',
  },
  {
    id: 2,
    keySearch: '10,15',
    value: 'Từ 10m² đến 15m²',
  },
  {
    id: 3,
    keySearch: '15,20',
    value: 'Từ 15m² đến 20m²',
  },
  {
    id: 4,
    keySearch: '20,30',
    value: 'Từ 20m² đến 30m²',
  },
  {
    id: 5,
    keySearch: '30,50',
    value: 'Từ 30m² đến 50m²',
  },
  {
    id: 6,
    keySearch: '50,gte',
    value: 'Từ 50m² trở lên',
  },
];

export const geolocateStyle = {
  top: 0,
  left: 0,
  padding: '10px',
};

export const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: '10px',
};

export const navStyle = {
  top: 72,
  left: 0,
  padding: '10px',
};

export const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: '10px',
};

export const sampleAddress = [
  {
    id: 1,
    name: 'Hồ Chí Minh',
    text: 'Thuê trọ tại Hồ Chí Minh',
  },
  {
    id: 2,
    name: 'Hà Nội',
    text: 'Thuê trọ tại Hà Nội',
  },
  {
    id: 3,
    name: 'Đà Nẵng',
    text: 'Thuê trọ tại Đà Nẵng',
  },
  {
    id: 4,
    name: 'Bình Dương',
    text: 'Thuê trọ tại Bình Dương',
  },
  {
    id: 5,
    name: 'Bắc Ninh',
    text: 'Thuê trọ tại Bắc Ninh',
  },
];

export const realEstateStatus = [
  {
    id: 1,
    note: 'Đợi duyệt',
  },
  {
    id: 2,
    note: 'Đã duyệt',
  },
  {
    id: 3,
    note: 'Bị từ chối',
  },
  {
    id: 4,
    note: 'Đã hết hạn',
  },
  {
    id: 5,
    note: 'Gia hạn thành công',
  },
  {
    id: 6,
    note: 'Đợi duyệt gia hạn',
  },
  {
    id: 7,
    note: 'Bị khóa',
  },
  {
    id: 8,
    note: 'Đã xóa',
  },
  {
    id: 9,
    note: 'Nháp',
  },
];

export default {
  videoExtensions,
  messageSuggestions,
  rentPriceSearch,
  areaSearch,
  geolocateStyle,
  fullscreenControlStyle,
  navStyle,
  scaleControlStyle,
  sampleAddress,
  realEstateStatus,
  contactSuggestions,
};
