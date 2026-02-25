import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Banner = () => {
    return (
        <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="my-16"
        >
            <SwiperSlide>
                <img src="/assets/banner/banner1.png" alt="Banner 1" />
            </SwiperSlide>

            <SwiperSlide>
                <img src="/assets/banner/banner2.png" alt="Banner 2" />
            </SwiperSlide>

            <SwiperSlide>
                <img src="/assets/banner/banner3.png" alt="Banner 3" />
            </SwiperSlide>
        </Swiper>
    );
};

export default Banner;