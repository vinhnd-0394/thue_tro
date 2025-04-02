/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Marker } from '@goongmaps/goong-map-react';
import { memo } from 'react';
import { iconGps } from '../../assets/images';

const PinsRealEstate = (props) => {
  const { latitude, longitude, onClick } = props;

  if (!latitude || !longitude) return null;
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <img src={iconGps} onClick={onClick} className="z-10 cursor-pointer" />
    </Marker>
  );
};

export default memo(PinsRealEstate);
