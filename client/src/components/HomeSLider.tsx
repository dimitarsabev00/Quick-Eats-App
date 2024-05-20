import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../store/hooks";
import { Product } from "../Types";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";

const HomeSLider: React.FC = () => {
  const products = useAppSelector(({ generalSlice }) => generalSlice.products);
  const [fruits, setFruits] = useState<Product[]>([]);
  useEffect(() => {
    setFruits(products?.filter((data) => data.product_category === "fruits"));
  }, [products]);

  return (
    <motion.div className="w-full flex items-start justify-start flex-col">
      <div className=" w-full flex items-center justify-between ">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-headingColor font-bold">
            Our Fresh & Healthy Fruits
          </p>
          <div className="w-[18rem] h-1 rounded-md bg-orange-500"></div>
        </div>
      </div>

      {/* Slider  */}
      <div className="w-full pt-24">
        <Swiper
          slidesPerView={4}
          centeredSlides={false}
          spaceBetween={30}
          grabCursor={true}
          className="mySwiper"
        >
          {fruits &&
            fruits.map((data, i) => (
              <SwiperSlide key={i}>
                <ProductCard key={i} data={data} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </motion.div>
  );
};

export default HomeSLider;
