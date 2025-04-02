import Slider from 'react-slick';
import { PremiumRealEstateCard } from '../components';
var settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  rows: 3,
  slidesPerRow: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: 'linear',
};
const PremiumRealEstateList = ({ premiumRealEstates, totalCounts }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Tin nổi bật</h2>
      <p className="text-sm font-bold text-gray-700">
        Có {totalCounts} tin đăng nổi bật
      </p>
      <Slider {...settings}>
        {premiumRealEstates.map((realEstate) => (
          <div key={realEstate.id} className="px-1 text-sm max-h-[100px]">
            <PremiumRealEstateCard realEstate={realEstate} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PremiumRealEstateList;
