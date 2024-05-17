import { motion } from "framer-motion";
import React from "react";
import { HiCurrencyDollar } from "../assets/icons";
import { buttonClick } from "../assets/animations";
import { IoBasket } from "../assets/icons";
import { Product } from "../Types";
import { useAppDispatch } from "../store/hooks";
import { addProduct } from "../store";
import { toast } from "react-hot-toast";

type ProductCardProps = {
  data: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const addProductToShoppingCart = () => {
    const newProductInShoppingCart = { ...data, quantity: 1 };
    dispatch(addProduct(newProductInShoppingCart));
    toast.success("Added to the cart");
  };

  return (
    <div className="bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3">
      <img src={data.imageURL} className="w-40 h-40 object-contain" alt="" />
      <div className="relative pt-12">
        <p className="text-xl text-headingColor font-semibold">
          {data.product_name}
        </p>
        <p className="text-lg font-semibold text-red-500 flex items-center justify-center gap-1">
          <HiCurrencyDollar className="text-red-500" />{" "}
          {data.product_price.toFixed(2)}
        </p>

        <motion.div
          {...buttonClick}
          onClick={addProductToShoppingCart}
          className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 right-2 cursor-pointer"
        >
          <IoBasket className="text-2xl text-primary" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProductCard;
