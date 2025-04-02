/* eslint-disable react/prop-types */
import { useState } from 'react';
import MapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from '@goongmaps/goong-map-react';
import MAP_STYLE from '../../../../constants/map-style-basic-v8.json';

import { getCursor } from '../../../../utils/mapUtils';
import PinsRealEstate from '../../../../components/Map/PinsRealEstate';
import {
  fullscreenControlStyle,
  navStyle,
  scaleControlStyle,
} from '../../../../constants/sampleConstant';

const GOONG_MAPTILES_KEY = 'your_goong_map_key'; // Tạo api key ở goong map, không phải ở google map

const Map = ({ latitude, longitude }) => {
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 16,
    bearing: 0,
    transitionDuration: 1000,
  });

  return (
    <div className="w-full h-[500px]">
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={MAP_STYLE}
        clickRadius={2}
        getCursor={getCursor}
        onViewportChange={setViewport}
        goongApiAccessToken={GOONG_MAPTILES_KEY}
      >
        <PinsRealEstate latitude={latitude} longitude={longitude} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </MapGL>
    </div>
  );
};
export default Map;
