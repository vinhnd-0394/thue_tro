/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { apiUpdateRealEstateByUser } from '../../../../apis/user/manager/realEstate.api';
import { apiGetPlaceDetailByPlaceId } from '../../../../apis/goong-map/mapApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DAInput, DAInputFile, DAMarkdownEditor, DATextarea } from '../../../../components/Input';
import { Map } from '../../../../components/Map';

const UpdateRealEstate = ({ realEstate, postTypes }) => {
  const [input, setInput] = useState(realEstate.locationDetails);
  const [showPredictions, setShowPredictions] = useState(true);
  const [predictions, setPredictions] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: realEstate.coordinates.coordinates[1],
    longitude: realEstate.coordinates.coordinates[0],
    zoom: 13,
    bearing: 0,
    transitionDuration: 1000,
  });

  const [imgSrc, setImgSrc] = useState(() => {
    const images = realEstate.medias.filter((media) =>
      media.type.startsWith('image/')
    );
    return images;
  });

  const [videoSrc, setVideoSrc] = useState(() => {
    const videos = realEstate.medias.filter(
      (media) => !media.type.startsWith('image/')
    );
    return videos;
  });

  const navigate = useNavigate();

  const { control, handleSubmit, formState, setValue, watch } = useForm({
    // resolver: yupResolver(validationSchema),
    // mode: "onChange",
    defaultValues: {
      province: realEstate.province || '',
      district: realEstate.district || '',
      wards: realEstate.wards || '',
      title: realEstate.title || '',
      description: realEstate.description || '',
      rentPrice: realEstate.rentPrice || 0,
      area: realEstate.area || '',
      latitude: realEstate.coordinates.coordinates[1],
      longitude: realEstate.coordinates.coordinates[0],
    },
  });

  const {
    isValid,
    //  errors,
    isSubmitting,
  } = formState;

  const watchTitle = watch('title');
  const watchImages = watch('images');
  const watchVideos = watch('videos');

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

  const onSubmitHandler = async (values) => {
    if (!isValid) return;
    let formData = new FormData();
    for (let key in values) {
      if (key !== 'images' && key !== 'videos') {
        formData.append(key, values[key]);
      } else if (key === 'images') {
        for (let i = 0; i < values.images.length; i++) {
          formData.append('images', values.images[i]);
        }
      } else {
        for (let i = 0; i < values.videos.length; i++) {
          formData.append('videos', values.videos[i]);
        }
      }
    }
    const response = await apiUpdateRealEstateByUser({
      formData,
      realEstateId: realEstate.id,
    });
    if (response.status === 200) {
      toast.success('Cập nhật bài đăng thành công');
      navigate();
    }
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

  const handleChange = (e) => {
    setShowPredictions(true);
    setInput(e.target.value);
  };

  if (!realEstate) return null;
  return (
    <div className="bg-gray-200">
      <div className="w-1/2 mx-auto">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex flex-col gap-4"
        >
          <div className="p-5 bg-white rounded-lg">
            <h3 className="text-lg font-bold">Sửa tin</h3>
            <h1>{realEstate.title}</h1>
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
            {/* <DAMarkdownEditor */}
            <DATextarea
              labelFor="Nội dung mô tả"
              name="description"
              id="description"
              placeholder="Nhập mô tả cho bài đăng"
              note="Nội dung mô tả tối thiểu 150 kí tự và không được dài quá 5000 ký tự."
              control={control}
              maxLength={5000}
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
              <div className="flex flex-col w-full my-4">
                <span className="mr-1">Loại bài đăng</span>
                <div className="w-full p-2 bg-gray-300 border border-gray-200 rounded-md">
                  {
                    postTypes.find((type) => type.id === realEstate.postTypeId)
                      .type
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 bg-white rounded-lg">
            <h3 className="text-lg font-bold">Hình ảnh</h3>
            <DAInputFile name="images" id="images" control={control} />
            {imgSrc.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {imgSrc.map((img, index) => {
                  return (
                    <div
                      key={index}
                      className="relative w-full pt-[100%] cursor-pointer bg-gray-300"
                    >
                      <img
                        src={img.path || img}
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
                        src={video.path || video}
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
            className={`bg-blue-500 w-full p-4 text-white font-semibold mt-5 ${
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

export default UpdateRealEstate;
