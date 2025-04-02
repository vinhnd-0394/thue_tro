import { RealEstateCard } from '../components';

const RealEstateList = ({ realEstates, fetchRealEstatesManager }) => {
  return realEstates.map((item, index) => (
    <RealEstateCard
      fetchRealEstatesManager={fetchRealEstatesManager}
      key={item.id}
      realEstate={item}
      index={index + 1}
    />
  ));
};

export default RealEstateList;
