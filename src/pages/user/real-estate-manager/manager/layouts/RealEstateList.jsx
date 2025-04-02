import { RealEstateCard } from "../components";

const RealEstateList = ({ realEstates }) => {
  return realEstates.map((item) => (
    <RealEstateCard key={item.id} realEstate={item} />
  ));
};

export default RealEstateList;
