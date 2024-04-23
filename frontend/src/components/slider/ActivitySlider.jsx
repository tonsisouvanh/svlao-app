import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./SliderStyle.css";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { apiRequest } from "../../utils/axiosConfig";

const ActivitySlider = () => {
  const [slideData, setslideData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncementImages = async () => {
      try {
        const response = await apiRequest.get(`/announcements/images?limit=4`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.data;
        setslideData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnnouncementImages();
    return () => {
      setslideData([]);
    };
  }, []);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper hero-swiper-button lg:h-full"
      >
        {slideData?.map((i, index) => {
          return (
            <SwiperSlide key={index} className="h-[22rem] w-full lg:h-[37rem]">
              {isLoading ? (
                <div className="relative h-full w-full animate-pulse rounded-md bg-gray-300">
                  <FaImage className="h-full w-full object-cover text-gray-500" />
                </div>
              ) : (
                <div className="relative h-full w-full">
                  <img
                    src={i.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ActivitySlider;
