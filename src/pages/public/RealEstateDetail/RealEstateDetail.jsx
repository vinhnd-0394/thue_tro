import { useParams } from 'react-router-dom';
import {
  getPublicOtherRealEstatesOwner,
  getRealEstatesDetail,
} from '../../../apis/user/realEstate.api';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getIdFromNameId } from '../../../utils/stringUtils';
import { Map, OtherPostOwner, OwnerInfo, Thumb, TopHeader } from './layouts';
import ChatModal from '../../../components/Modal/chat-modal/ChatModal';
import { AppContext } from '../../../contexts/app.context';
import ContactModal from '../../../components/Modal/contact-modal/ContactModal';
import DOMPurify from 'dompurify';

const RealEstateDetail = () => {
  const { profile } = useContext(AppContext);
  const { nameId } = useParams();
  const realEstateId = getIdFromNameId(nameId);
  const [realEstate, setRealEstate] = useState(null);
  const [open, setOpen] = useState('');
  const [otherPosts, setOtherPosts] = useState([]);
  const ownerOtherPostRef = useRef(null);
  const refToScrollTop = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    refToScrollTop.current?.scrollIntoView({ behavior: 'smooth' });
  }, [realEstateId]);

  const fetchRealEstateDetail = useCallback(async () => {
    const response = await getRealEstatesDetail(realEstateId);
    if (response.status === 200) {
      setRealEstate(response.data);
    }
  }, [realEstateId]);

  const fetchOtherPost = useCallback(async () => {
    const response = await getPublicOtherRealEstatesOwner({
      ownerId: realEstate?.owner?.id,
      realEstateId,
    });
    if (response.status === 200) {
      setOtherPosts(response.data);
    }
  }, [realEstate?.owner?.id, realEstateId]);

  useEffect(() => {
    fetchRealEstateDetail();
  }, [fetchRealEstateDetail]);

  const handleClose = () => {
    setOpen('');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!ownerOtherPostRef.current) return;

      const { top } = ownerOtherPostRef.current.getBoundingClientRect();
      if (top <= window.innerHeight) {
        fetchOtherPost();
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchOtherPost]);

  const handleScrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!realEstate) return null;

  return (
    <>
      <div className="flex flex-col mb-[500px]" ref={refToScrollTop}>
        <div className="w-[55%] mx-auto">
          <TopHeader
            realEstate={realEstate}
            handleScrollToMap={handleScrollToMap}
          ></TopHeader>
          <div className="container">
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2">
                <Thumb
                  medias={realEstate.medias}
                  thumb={realEstate.thumb}
                  title={realEstate.title}
                />
                <div className="mt-8">
                  <div className="p-4 font-bold underline capitalize rounded">
                    Thông tin bài đăng
                  </div>
                  <div className="p-4 bg-gray-100 rounded-md shadow">
                    <div className="text-sm leading-loose ">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(realEstate.description),
                        }}
                      >
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8" ref={mapRef}>
                  <div className="p-4 font-bold underline capitalize rounded">
                    Vị trí trên bản đồ
                  </div>
                  <div className="p-4 bg-gray-100 rounded-md shadow">
                    {realEstate.coordinates && (
                      <Map
                        latitude={realEstate.coordinates.coordinates[1]}
                        longitude={realEstate.coordinates.coordinates[0]}
                      ></Map>
                    )}
                  </div>
                </div>
              </div>
              {(!profile || realEstate.owner.id !== profile.id) && (
                <div className="col-span-1">
                  <OwnerInfo owner={realEstate.owner} setOpen={setOpen} />
                </div>
              )}
            </div>
          </div>
          <div className="mt-8" ref={ownerOtherPostRef}>
            {otherPosts.length > 0 && (
              <OtherPostOwner
                ownerName={realEstate.owner.name}
                otherPosts={otherPosts}
              />
            )}
          </div>
        </div>
      </div>
      <ChatModal
        realEstate={realEstate}
        handleClose={handleClose}
        open={open === 'chat'}
      />
      <ContactModal
        realEstate={realEstate}
        handleClose={handleClose}
        open={open === 'confirm'}
        user={profile || null}
      />
    </>
  );
};

export default RealEstateDetail;
