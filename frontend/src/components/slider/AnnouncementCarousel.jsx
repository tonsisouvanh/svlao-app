import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./SliderStyle.css";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { apiRequest } from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const AnnouncementCarousel = () => {
  const [slideData, setslideData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
            <SwiperSlide key={index} className="">
              {isLoading ? (
                <div className="relative h-full w-full animate-pulse rounded-md bg-gray-300">
                  <FaImage className="h-full w-full object-cover text-gray-500" />
                </div>
              ) : (
                <div className="relative h-[22rem] w-full lg:h-[34rem]">
                  <img
                    src={i.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="sm absolute bottom-4 right-4 mt-8 flex flex-col items-center justify-center sm:flex-row sm:space-x-4 sm:px-0 lg:mt-12">
                    <button
                      onClick={() =>
                        navigate(`/announcement-list/announcement/${i._id}`)
                      }
                      className="mt-4 rounded-lg border-2 border-primary bg-primary px-6 py-2 font-medium text-white transition hover:translate-y-1"
                    >
                      ອ່ານຕື່ມ
                    </button>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default AnnouncementCarousel;
