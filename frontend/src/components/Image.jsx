import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ classname, image }) => {
  return (
    <>
      <LazyLoadImage
        className={classname}
        src={image}
        alt="Image description"
        placeholder={
          <div className="h-full w-full animate-pulse bg-gray-300"></div>
        }
        effect="blur" // Apply blur effect
        threshold={50} // Load image when 50px within viewport
      />
    </>
  );
};

export default Image;
