import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { apiCreateRealEstateByUser } from '../../../../apis/user/manager/realEstate.api';
import {
  apiGetPlaceAutocomplete,
  apiGetPlaceDetailByPlaceId,
} from '../../../../apis/goong-map/mapApi';
import useDebounce from '../../../../hooks/useDebounce';
import { apiCreatePaymentLink } from '../../../../apis/user/payment.api';
import { realEstateSchema } from '../../../../utils/validate';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import {
  DAInput,
  DAInputFile,
  DAMarkdownEditor,
  DATextarea,
} from '../../../../components/Input';
import { DADropdownForm } from '../../../../components/Dropdown';
import { Map } from '../../../../components/Map';

/* eslint-disable react/prop-types */
const CreateRealEstate = ({ postTypes }) => {
  const [input, setInput] = useState('');
  const [showPredictions, setShowPredictions] = useState(true);
  const [predictions, setPredictions] = useState([]);

  const [imgSrc, setImgSrc] = useState([]);

  const [videoSrc, setVideoSrc] = useState([]);

  const [viewport, setViewport] = useState({
    latitude: 21.002100345847243,
    longitude: 105.8415683902572,
    zoom: 13,
    bearing: 0,
    transitionDuration: 1000,
  });
  const { control, handleSubmit, formState, setValue, watch } = useForm({
    resolver: yupResolver(realEstateSchema),
    mode: 'onChange',
    defaultValues: {
      latitude: '',
      longitude: '',
    },
  });

  const inputDebounce = useDebounce(input, 500);
  const { isValid, isSubmitting } = formState;

  const watchTitle = watch('title');
  const watchImages = watch('images');
  const watchVideos = watch('videos');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (watchImages?.length > 0) {
      const images = Array.from(watchImages).filter((media) => {
        return media.type.startsWith('image/');
      });
      Promise.all(
        images.map((media) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(media);
          });
        })
      ).then((images) => {
        setImgSrc(images);
      });
    }
  }, [watchImages]);

  useEffect(() => {
    if (watchVideos?.length > 0) {
      let videos = Array.from(watchVideos).filter((media) =>
        media.type.startsWith('video/')
      );
      videos = videos.map((media) => {
        return URL.createObjectURL(media);
      });
      setVideoSrc(videos);
    }
  }, [watchVideos]);

  function getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setViewport((prevViewport) => ({
            ...prevViewport,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error('Lỗi khi lấy tọa độ:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.error('Trình duyệt của bạn không hỗ trợ API Geolocation.');
    }
  }

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

  const handleChange = (e) => {
    setShowPredictions(true);
    setInput(e.target.value);
  };

  const handleSelectPlace = async (place) => {
    setInput(place.description);
    setShowPredictions(false);
    const getPlace = await apiGetPlaceDetailByPlaceId({
      place_id: place.place_id,
    });
    if (getPlace.status === 'OK') {
      const latitude = getPlace.result.geometry.location.lat;
      const longitude = getPlace.result.geometry.location.lng;
      setViewport((prev) => {
        return {
          ...prev,
          latitude,
          longitude,
          zoom: 16,
        };
      });
      setValue('province', getPlace.result.compound.province);
      setValue('district', getPlace.result.compound.district);
      setValue('wards', getPlace.result.compound.commune);
      setValue('locationDetails', getPlace.result.formatted_address);
      setValue('latitude', latitude);
      setValue('longitude', longitude);
    }
  };

  const onSubmitHandler = async (values) => {
    console.log('values', values);
    let postType = {};
    if (!isValid) {
      toast.error('Thông tin chưa hợp lệ. Hãy kiểm tra lại');
      return;
    }
    if (!values.images.length && !values.videos.length) {
      toast.error('Vui lòng chọn ảnh / video của phòng trọ');
      return;
    }
    let formData = new FormData();
    for (let key in values) {
      if (key !== 'images' && key !== 'videos' && key !== 'postType') {
        formData.append(key, values[key]);
      }
      if (key === 'images') {
        for (let i = 0; i < values.images.length; i++) {
          formData.append('images', values.images[i]);
        }
      }
      if (key === 'videos') {
        for (let i = 0; i < values.videos.length; i++) {
          formData.append('videos', values.videos[i]);
        }
      }
      if (key === 'postType') {
        postType = postTypes.find((type) => type.type === values.postType);
        formData.append('postTypeId', postType.id);
      }
    }

    // toast.error('Mở comment ra. Hiện tại chưa call API');

    const createRealEstateResponse = await apiCreateRealEstateByUser({
      formData,
    });
    const payload = {
      referenceId: createRealEstateResponse.data.id,
      referenceModel: 'RealEstate',
      amount: Number(postType.price),
      description: 'Tạo mới tin đăng',
      cancelUrl: `${window.location.origin}/user/real-estates`,
      returnUrl: `${window.location.origin}/user/real-estates`,
    };
    if (createRealEstateResponse.status === 201) {
      const createPaymentLinkResponse = await apiCreatePaymentLink(payload);
      if (createPaymentLinkResponse.status === 201) {
        window.location.href = createPaymentLinkResponse.data.checkoutUrl;
      }
    }
  };

  return (
    <div className="p-10 bg-gray-200">
      <div className="w-1/2 mx-auto">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex flex-col gap-4"
        >
          <div className="p-5 bg-white rounded-lg">
            <h3 className="text-lg font-bold">Đăng tin mới</h3>
          </div>
          <div className="p-5 bg-white rounded-lg">
            <h3 className="text-lg font-bold">Khu vực</h3>
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 font-bold transition-all border border-gray-300 rounded-md outline-none focus:border-blue-500"
                placeholder="Nhập thông tin địa chỉ"
                onChange={handleChange}
                value={input}
              />
              {showPredictions && predictions.length > 0 && (
                <ul
                  className={`z-10 top-full left-0 w-full rounded-md bg-white absolute max-h-[400px] border border-gray-400 overflow-y-auto${
                    showPredictions ? '' : 'opacity-0 invisible'
                  }`}
                >
                  {predictions.map((place) => (
                    <li
                      key={place.place_id}
                      onClick={() => handleSelectPlace(place)}
                      className="p-2 border-t cursor-pointer hover:bg-blue-100"
                    >
                      {place.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 ">
              <DAInput
                labelFor="Tỉnh/Thành phố"
                name="province"
                id="province"
                control={control}
                required
                showError
                disabled
              />
              <DAInput
                labelFor="Quận/Huyện"
                name="district"
                id="district"
                control={control}
                required
                showError
                disabled
              />
              <DAInput
                labelFor="Phường/Xã/Thị trấn"
                name="wards"
                id="wards"
                control={control}
                required
                showError
                disabled
              />
            </div>
            <Map
              setValue={setValue}
              viewport={viewport}
              setViewport={setViewport}
              setPredictions={setPredictions}
              setInput={setInput}
              setShowPredictions={setShowPredictions}
            />
          </div>
          <div className="p-5 bg-white rounded-lg">
            <h3 className="text-lg font-bold">Thông tin bài đăng</h3>
            <DATextarea
              labelFor="Tiêu đề"
              name="title"
              id="title"
              placeholder="Nhập tiêu đề cho bài đăng"
              note="Tối thiểu 30 ký tự, tối đa 100 ký tự"
              control={control}
              maxLength={100}
              required
              showError
            />
            <DAMarkdownEditor
              labelFor="Nội dung mô tả"
              name="description"
              id="description"
              placeholder="Nhập mô tả cho bài đăng"
              note="Nội dung mô tả tối thiểu 100 kí tự và không được dài quá 1000 ký tự."
              control={control}
              maxLength={1000}
              required
              showError
            />
            <div className="flex items-center gap-2">
              <DAInput
                labelFor="Tiền thuê (Triệu/tháng)"
                name="rentPrice"
                id="rentPrice"
                type="number"
                placeholder="0 đồng / tháng"
                control={control}
                required
                showError
              />
              <DAInput
                labelFor="Diện tích (m²)"
                name="area"
                id="area"
                type="number"
                placeholder="Nhập diện tích phòng trọ"
                control={control}
                required
                showError
              />
              <DADropdownForm
                control={control}
                setValue={setValue}
                name="postType"
                text="---Loại bài đăng---"
                label="Loại bài đăng"
                required
                showError
                data={
                  postTypes.length > 0
                    ? postTypes.map((type) => {
                        return { id: type.id, value: type.type };
                      })
                    : []
                }
              />
            </div>
          </div>
          <div className="p-5 bg-white rounded-lg">
            <h3 className="text-lg font-bold">Hình ảnh</h3>
            <DAInputFile
              name="images"
              id="images"
              control={control}
              showError
            />
            {imgSrc.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {imgSrc.map((img, index) => {
                  return (
                    <div
                      key={index}
                      className="relative w-full pt-[100%] cursor-pointer bg-gray-300"
                    >
                      <img
                        src={img}
                        alt={watchTitle}
                        className="absolute top-0 left-0 object-contain w-full h-full bg-white border cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="p-5 bg-white rounded-lg">
            <h3 className="text-lg font-bold">Video</h3>
            <DAInputFile
              name="videos"
              id="videos"
              control={control}
              accept="video/mp4"
              showError
            />
            {videoSrc.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {videoSrc.map((video, index) => {
                  return (
                    <div
                      key={index}
                      className="relative w-full pt-[100%] cursor-pointer bg-gray-300"
                    >
                      <video
                        src={video}
                        alt={watchTitle}
                        className="absolute top-0 left-0 object-contain w-full h-full bg-white border cursor-pointer"
                        controls="controls"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`bg-blue-500 w-full p-4 text-white font-semibold mt-5 rounded ${
              isSubmitting ? 'opacity-50' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 mx-auto border-2 border-white rounded-full border-t-transparent animate-spin"></div>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRealEstate;
