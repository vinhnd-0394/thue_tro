const GOONG_API_KEY = 'your_goong_api_key'; // Tạo api key ở goong map, không phải ở google map
import thirdParty from './../third-party.api';

export const apiGetGeocodingByLatLng = async (params) => {
  return await thirdParty.get('/Geocode', {
    params: { ...params, api_key: GOONG_API_KEY },
  });
};

export const apiGetPlaceAutocomplete = async ({ input }) => {
  return await thirdParty.get('/Place/AutoComplete', {
    params: { input, api_key: GOONG_API_KEY, limit: 20 },
  });
};
export const apiGetPlaceDetailByPlaceId = async ({ place_id }) => {
  return await thirdParty.get('/Place/Detail', {
    params: { place_id, api_key: GOONG_API_KEY },
  });
};
