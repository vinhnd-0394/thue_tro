import { RealEstateCard } from "../components";

const RealEstateList = ({ realEstates }) => {
  return realEstates.map((ele) => (
    <RealEstateCard key={ele.id} realEstate={ele} />
  ));
};

export default RealEstateList;
