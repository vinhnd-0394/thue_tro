/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react';
import MapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Popup,
} from '@goongmaps/goong-map-react';
import Pins from './Pins';
import {
  fullscreenControlStyle,
  geolocateStyle,
  navStyle,
  scaleControlStyle,
} from '../../constants/sampleConstant';
import PinsRealEstate from './PinsRealEstate';
import {
  apiGetGeocodingByLatLng,
  apiGetPlaceAutocomplete,
} from '../../apis/goong-map/mapApi';
import useDebounce from '../../hooks/useDebounce';
import { RealEstateSearchPopup } from '../Popup';
import { getCursor } from '../../utils/mapUtils';

const GOONG_MAPTILES_KEY = 'your_goong_map_key'; // Tạo api key ở goong map, không phải ở google map

const MapSearch = ({
  input,
  setInput,
  setPredictions,
  viewport,
  setViewport,
  realEstates,
  updateSearchParams,
}) => {
  const inputDebounce = useDebounce(input, 500);
  const viewPortDebounce = useDebounce(viewport, 500);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (inputDebounce.length > 5) {
        const response = await apiGetPlaceAutocomplete({
          input: inputDebounce,
        });
        if (response.status === 'OK' && response.predictions.length > 0) {
          setPredictions(response.predictions);
        }
      }
    };
    fetchLocation();
  }, [inputDebounce, setPredictions]);

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
          setInput(location.formatted_address);
        }
        setViewport((prev) => {
          return {
            ...prev,
            latitude: lat,
            longitude: lng,
          };
        });
      }

      updateSearchParams({
        latitude: lat,
        longitude: lng,
      });
    },
    [setViewport, updateSearchParams]
  );

  useEffect(() => {
    updateSearchParams({
      latitude: viewPortDebounce.latitude,
      longitude: viewPortDebounce.longitude,
    });
  }, [updateSearchParams, viewPortDebounce]);

  return (
    <div className="w-full h-full">
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        clickRadius={2}
        onClick={handleSelectLocation}
        getCursor={getCursor}
        onViewportChange={setViewport}
        goongApiAccessToken={GOONG_MAPTILES_KEY}
      >
        {popupInfo && (
          <Popup
            className="z-20"
            tipSize={5}
            anchor="top"
            latitude={popupInfo.coordinates.coordinates[1]}
            longitude={popupInfo.coordinates.coordinates[0]}
            closeOnClick={false}
            onClose={setPopupInfo}
          >
            <RealEstateSearchPopup realEstate={popupInfo} />
          </Popup>
        )}
        <Pins latitude={viewport.latitude} longitude={viewport.longitude} />

        {realEstates.length > 0 &&
          realEstates.map((item) => {
            if (!item.coordinates) return null;
            return (
              <PinsRealEstate
                latitude={item.coordinates.coordinates[1]}
                longitude={item.coordinates.coordinates[0]}
                key={item.id}
                onClick={() => setPopupInfo(item)}
              />
            );
          })}
        <GeolocateControl style={geolocateStyle} auto />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </MapGL>
    </div>
  );
};
export default MapSearch;
