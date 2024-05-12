import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { collection, getDocs, query } from "@firebase/firestore";
import { db } from "../../configs/firebase";
import { setAllProducts } from "../../store";

const DBHome: React.FC = () => {
  const products = useAppSelector(({ generalSlice }) => generalSlice.products);
  const dispatch = useAppDispatch();

  const getAllProducts = async () => {
    // Fetch all products from Firestore

    const productsQuery = query(collection(db, "products"));
    const querySnapshot = await getDocs(productsQuery);
    const allProducts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setAllProducts(allProducts));
  };

  useEffect(() => {
    if (!products.length) {
      getAllProducts();
    }
  }, []);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      DBHome
    </div>
  );
};

export default DBHome;
