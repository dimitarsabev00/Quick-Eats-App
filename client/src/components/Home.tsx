import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { buttonClick, staggerFadeInOut } from "../assets/animations";
import { Delivery, Hero } from "../assets";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Product } from "../Types";
import { IoBasket } from "react-icons/io5";
import { addItemToShoppingCart, getShoppingCart } from "../api";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../configs/firebase";
import { toast } from "react-hot-toast";
import { setShoppingCart } from "../store";

const Home: React.FC = () => {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [user] = useAuthState(auth);

  const products = useAppSelector(({ generalSlice }) => generalSlice.products);

  const getRandomProducts = (products: Product[], count: number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const selectedProducts = getRandomProducts(products, 5);
    setRandomProducts(selectedProducts);
  }, [products]);

  const dispatch = useAppDispatch()
  const addProductToShoppingCart = async (data:Product) => {
    await addItemToShoppingCart(user?.uid, data);
    toast.success("Added to the cart");
    const allItemsFromShoppingCart = await getShoppingCart(user?.uid);
    dispatch(setShoppingCart(allItemsFromShoppingCart));
  };

  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full">
          <p className="text-lg font-semibold text-orange-500">Free Delivery</p>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
            <img
              src={Delivery}
              alt="Delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-[40px] text-headingColor md:text-[72px] font-sans font-extrabold tracking-wider">
          The Fastest Delivery in{" "}
          <span className="text-orange-600">Your City</span>
        </p>

        <p className="text-textColor text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ipsam
          doloribus et similique distinctio, rem deleniti ipsa, nesciunt vitae
          labore voluptates sunt ducimus mollitia id libero! Nostrum expedita
          libero recusandae?
        </p>
        <motion.button
          {...buttonClick}
          className="bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold"
        >
          Order Now
        </motion.button>
      </div>

      <div className="py-2 flex-1 flex items-center justify-center relative w-full">
        <img
          className="absolute top-0 right-0 w-full h-420  md:h-650"
          src={Hero}
          alt="Hero"
        />

        <div className="w-full md:w-460 ml-0 mt-[5rem] flex flex-wrap items-center justify-center gap-4 gap-y-14">
          {randomProducts &&
            randomProducts.map((data) => (
              <motion.div
                key={data.productId}
                {...staggerFadeInOut}
                className="w-32 h-36 md:h-auto md:w-190 p-4 bg-lightOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={data.imageURL}
                  className="w-12 h-12 md:w-32 md:h-32 md:-mt-16 object-contain"
                  alt={data.product_name}
                />
                <p className="text-sm lg:text-xl font-semibold text-textColor">
                  {data.product_name.slice(0, 14)}
                </p>
                <p className="text-[12px] text-center md:text-base text-lighttextGray font-semibold capitalize">
                  {data.product_category}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span>{" "}
                  {data.product_price}
                </p>
                <motion.div
          {...buttonClick}
          onClick={()=>{addProductToShoppingCart(data)}}
          className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute top-[70%] right-2 cursor-pointer"
        >
          <IoBasket className="text-2xl text-primary" />
        </motion.div>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
