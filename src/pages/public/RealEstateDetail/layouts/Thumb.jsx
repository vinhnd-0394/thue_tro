/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Thumb = ({ medias, title, thumb }) => {
  const [indexSlider, setIndexSlider] = useState([0, 5]);
  const [currentThumb, setCurrentThumb] = useState("");

  useEffect(() => {
    setCurrentThumb(thumb);
  }, [thumb]);

  const nextSlider = () => {
    const [startIndex, endIndex] = indexSlider;
    const newIndexSlider = [startIndex + 1, endIndex + 1];
    setIndexSlider(
      newIndexSlider[1] <= medias.length - 1 ? newIndexSlider : [0, 5]
    );
    setCurrentThumb(thumb);
  };

  const prevSlider = () => {
    const [startIndex, endIndex] = indexSlider;
    const newIndexSlider = [startIndex - 1, endIndex - 1];
    setIndexSlider(newIndexSlider[0] > 0 ? newIndexSlider : [0, 5]);
    setCurrentThumb(thumb);
  };

  const selectThumb = (selectedThumb) => {
    setCurrentThumb(selectedThumb);
  };

  const renderSliderMedias = () => {
    return medias.slice(...indexSlider).map((media, index) => {
      const isImage = media.type.includes("image");
      const isThumb = media.path === currentThumb?.path;
      return (
        <div
          key={media.path + index}
          className="relative w-full pt-[100%] cursor-pointer bg-gray-300"
          onClick={() => selectThumb(media)}
        >
          {isImage ? (
            <img
              src={media.path}
              alt={title}
              className="absolute top-0 left-0 object-contain w-full h-full bg-white border cursor-pointer"
            />
          ) : (
            <video
              src={media.path}
              className="absolute top-0 left-0 object-contain w-full h-full bg-white border cursor-pointer"
            ></video>
          )}

          {isThumb && (
            <div className="absolute inset-0 border-4 border-orange-500" />
          )}
        </div>
      );
    });
  };

  const renderThumb = () => {
    if (typeof currentThumb === "string") {
      const isVideo = currentThumb.includes(".mp4");
      return isVideo ? (
        <video
          src={currentThumb}
          className="absolute top-0 left-0 object-contain w-full h-full cursor-pointer"
          controls="controls"
        ></video>
      ) : (
        <img
          src={currentThumb}
          alt={title}
          className="absolute top-0 left-0 object-contain w-full h-full"
        />
      );
    }
    return currentThumb?.type.includes("image") ? (
      <img
        src={currentThumb.path || currentThumb}
        alt={title}
        className="absolute top-0 left-0 object-contain w-full h-full"
      />
    ) : (
      <video
        src={currentThumb?.path}
        className="absolute top-0 left-0 object-contain w-full h-full cursor-pointer"
        controls="controls"
        type={currentThumb?.type}
      ></video>
    );
  };

  return (
    <>
      <div className="w-full pt-[100%] bg-gray-300 relative rounded-md overflow-hidden">
        {renderThumb()}
      </div>
      {medias.length > 0 && (
        <div className="relative grid grid-cols-5 gap-1 mt-4">
          <button
            className="absolute left-0 flex items-center justify-center w-10 h-10 text-white transition-all duration-200 -translate-y-1/2 z-[2] top-1/2 bg-black/80 hover:bg-black/40"
            onClick={prevSlider}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          {renderSliderMedias()}
          <button
            className="absolute right-0 flex items-center justify-center w-10 h-10 text-white transition-all duration-200 -translate-y-1/2 z-[2] top-1/2 bg-black/80 hover:bg-black/40"
            onClick={nextSlider}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Thumb;
