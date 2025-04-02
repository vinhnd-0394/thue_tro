/* eslint-disable react/prop-types */
import { RealEstateRecommendCard } from "../components";

const OtherPostOwner = ({ otherPosts, ownerName }) => {
  return (
    <div>
      <div className="p-4 font-bold underline capitalize rounded">
        Tin đăng khác của {ownerName}
      </div>
      {otherPosts.length > 0 ? (
        <div className="grid grid-cols-5 gap-2">
          {otherPosts.map((post) => {
            return <RealEstateRecommendCard realEstate={post} key={post.id} />;
          })}
        </div>
      ) : (
        <p>ok</p>
      )}
    </div>
  );
};

export default OtherPostOwner;
