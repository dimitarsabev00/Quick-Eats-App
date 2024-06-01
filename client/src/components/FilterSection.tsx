import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoFastFood } from "../assets/icons";
import { useAppSelector } from "../store/hooks";
import { staggerFadeInOut } from "../assets/animations";
import { statuses } from "../utils/helpers";
import ProductCard from "./ProductCard";

const FilterSection: React.FC = () => {
  const [category, setCategory] = useState("fruits");
  const products = useAppSelector(({ generalSlice }) => generalSlice.products);

  return (
    <motion.div className="w-full flex flex-col items-start justify-start">
      <div className="md:w-full w-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-headingColor font-bold">Our Hot Dishes</p>
          <div className="w-40 h-1 rounded-md bg-orange-500"></div>
        </div>
      </div>

      <div className="w-full md:overflow-hidden overflow-x-auto pt-6 flex items-center justify-start gap-6 py-8">
        {statuses &&
          statuses.map((data, i) => (
            <FilterCard
              key={data.id}
              data={data}
              category={category}
              setCategory={setCategory}
              index={i}
            />
          ))}
      </div>

      <div className="flex items-center justify-evenly flex-wrap gap-4 mt-12">
        {products &&
          products
            .filter((data) => data.product_category === category)
            .map((data, i) => <ProductCard key={i} data={data} />)}
      </div>
    </motion.div>
  );
};

export default FilterSection;

type FilterCardProps = {
  data: { id: number; title: string; category: string };
  index: number;
  category: string;
  setCategory: (category: string) => void;
};
const FilterCard: React.FC<FilterCardProps> = ({
  data,
  category,
  setCategory,
}) => {
  return (
    <motion.div
      key={data.id}
      {...staggerFadeInOut}
      onClick={() => setCategory(data.category)}
      className={`group w-28 min-w-[128px] cursor-pointer rounded-md py-6 ${
        category === data.category ? "bg-red-500" : "bg-primary"
      } hover:bg-red-500 shadow-md flex flex-col items-center justify-center gap-4`}
    >
      <div
        className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${
          category === data.category ? "bg-primary" : "bg-red-500"
        }`}
      >
        <IoFastFood
          className={`${
            category === data.category ? "text-red-500" : "text-primary"
          } group-hover:text-red-500`}
        />
      </div>
      <p
        className={`text-xl font-semibold ${
          category === data.category ? "text-primary" : "text-textColor"
        } group-hover:text-primary`}
      >
        {data.title}
      </p>
    </motion.div>
  );
};
