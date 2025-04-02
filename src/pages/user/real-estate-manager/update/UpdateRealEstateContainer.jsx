import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdateRealEstate from './UpdateRealEstate';
import { AppContext } from '../../../../contexts/app.context';
import { apiGetRealEstatesDetail } from '../../../../apis/user/manager/realEstate.api';

const UpdateRealEstateContainer = () => {
  const { id } = useParams();
  const { addressData, postTypes } = useContext(AppContext);
  const [realEstate, setRealEstate] = useState(null);
  const fetchRealEstateDetail = useCallback(async () => {
    const response = await apiGetRealEstatesDetail(id);
    if (response.status === 200) {
      setRealEstate(response.data);
    }
  }, [id]);
  useEffect(() => {
    fetchRealEstateDetail();
  }, [fetchRealEstateDetail]);

  if (!realEstate) return null;
  return (
    <UpdateRealEstate
      realEstate={realEstate}
      addressData={addressData}
      postTypes={postTypes}
    />
  );
};

export default UpdateRealEstateContainer;
