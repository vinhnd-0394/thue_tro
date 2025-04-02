/* eslint-disable react/prop-types */
import { Marker } from '@goongmaps/goong-map-react';
import { memo } from 'react';
import { iconHouse } from '../../assets/images';

const Pins = (props) => {
  const { latitude, longitude } = props;

  if (!latitude || !longitude) return null;
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <img src={iconHouse} className="z-10 cursor-pointer" />
    </Marker>
  );
};

export default memo(Pins);
