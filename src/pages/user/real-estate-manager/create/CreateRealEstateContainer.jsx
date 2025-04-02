import { useContext } from 'react';
import { AppContext } from '../../../../contexts/app.context';
import CreateRealEstate from './CreateRealEstate';

const CreateRealEstateContainer = () => {
  const { addressData, postTypes } = useContext(AppContext);
  return <CreateRealEstate addressData={addressData} postTypes={postTypes} />;
};

export default CreateRealEstateContainer;
