/* eslint-disable react/prop-types */
import { useCallback } from 'react';
import MapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from '@goongmaps/goong-map-react';
import { apiGetGeocodingByLatLng } from '../../apis/goong-map/mapApi';
import { getCursor } from '../../utils/mapUtils';
import {
  fullscreenControlStyle,
  geolocateStyle,
  navStyle,
  scaleControlStyle,
} from '../../constants/sampleConstant';
import Pins from './Pins';

const GOONG_MAPTILES_KEY = 'your_goong_map_key'; // Tạo api key ở goong map, không phải ở google map

const Map = ({
  setValue,
  viewport,
  setViewport,
  setInput,
  setShowPredictions,
}) => {
  const handleSelectLocation = useCallback(
    async (event) => {
      const [lng, lat] = event.lngLat;
      const latlng = `${lat}, ${lng}`;
      const response = await apiGetGeocodingByLatLng({
        latlng,
      });
      if (response.status === 'OK') {
        if (response.results.length > 0) {
          const location = response.results[0];
          setValue('province', location.compound.province);
          setValue('district', location.compound.district);
          setValue('wards', location.compound.commune);
          setValue('locationDetails', location.formatted_address);
          setInput(location.formatted_address);
          setShowPredictions(false);
        }
      }

      setValue('latitude', lat);
      setValue('longitude', lng);
      setViewport((prev) => {
        return {
          ...prev,
          latitude: lat,
          longitude: lng,
          zoom: 16,
        };
      });
    },
    [setInput, setShowPredictions, setValue, setViewport]
  );

  return (
    <div className="w-full h-[500px]">
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        clickRadius={1}
        onClick={handleSelectLocation}
        getCursor={getCursor}
        onViewportChange={setViewport}
        goongApiAccessToken={GOONG_MAPTILES_KEY}
      >
        <Pins latitude={viewport.latitude} longitude={viewport.longitude} />

        <GeolocateControl style={geolocateStyle} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </MapGL>
    </div>
  );
};
export default Map;
